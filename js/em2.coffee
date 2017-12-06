# Simulador web de memoria rápida
# autor : roberto chalean	
# año 2015
# robertchalean@live.com
#
# javascript inmersion ``
						
class motorReaction
	pasadas : 0

	resultado : 0

	killTimeout : 0
	killTimeout3 : 0

	tipo : 0

	esMovil : 0
	myZoom : "100%"

	#Memoria Rapida	
	mMR : []
	mCurrentMR : []
	ejerciciosMR : []
	seleccionMR : ""
	matrizSeleccionMR : []
	matrizMRConfiguracion : []
	todasConfiguracionesMR : []

	digitosMR : 0
	tipoMR : 0
	espacioMR: 0
	ejerciciosMR : []
	
	primeraMR : 0
	selectedMRAccion : 0

	tipoMRGo : 0
	tiempoMRGo : 0
	digitosMRGo : 0
	matrizMRConfiguracionGo : []

	resultadosMRGo : []
	contadorMR : 0

	arrayMRBin : []

	bMRGo : 1

	restaYMR : 0

	widthGo : 0

	disableCheck : 0

	correccionMovilY : 0

	mostrarValores : 0

	topMovil : 0

	arrayGoActivos : []

	ch1 : 0
	ch2 : 0
	tAutoplay : 0

	killAutoplay : 0
	killAS : 0
	killAS1 : 0
	
	constructor : () ->


		$("#randomActive").click =>
			if $("#randomActive").is(':checked')
				$("#autoshow").prop('checked', false);
				$("#autoplay").prop('checked', false);

			clearInterval(@killAutoplay)
			clearInterval(@killTimeout1)
			clearInterval(@killAS)
			clearInterval(@killAS1)

		$("#autoplay").click =>
			if $("#autoplay").is(':checked')
				$("#randomActive").prop('checked', false);

		$("#autoshow").click =>
			if $("#autoshow").is(':checked')
				$("#randomActive").prop('checked', false);

				if ( parseInt($("#tiempoAutoshow").val()) + parseInt($("#tiempoAutoshow1").val()) ) * 1000 >= parseInt($("#tiempoAutoplay").val())
					parseInt($("#tiempoAutoplay").val( (parseInt($("#tiempoAutoshow").val()) + parseInt($("#tiempoAutoshow1").val()) ) * 1000 + 1000))  
				
		#no esta registrado
		$("#logInOrSignUp").hide()
		$("#siguiente-span").hide()
		$("#delete-all-span").hide()
		$("#tamano-texto-td").hide()
		$("#zoom-span").hide()
	
		if userId == 0
			#$("#control-usuarios").html("""<a href="#" onclick="$('#logInOrSignUp').show();">Log In or sign up</a>""")
			ponerControlUsuarios();
		else
			
			ponerLogout(userName);

		#console.clear()
		myWidth = window.innerWidth
		myHeight = window.innerHeight

		console.log(myWidth + "x" + myHeight)

		
		@disableCheck = 1
		

		$("#contadorMR").html(@contadorMR)
	

		@iniciarBin()
		@selectedMRAccion = 0
		@iniciarMR()

		$('body').keyup (e) =>
			if e.keyCode == 32
				@disableCheck = 0

				clearInterval(@killAutoplay)
				clearInterval(@killTimeout1)
				clearInterval(@killAS)
				clearInterval(@killAS1)
								
				$("#contadorMR").html(@contadorMR)
				$("#div-help").hide()
				$("#div-configurar").hide()	
				$("#controlesMR1").hide()	
	
				@goMR(0)

			if e.keyCode == 13
				console.log @mostrarValores
				if @mostrarValores
					@goMR(2)
					return

				if @disableCheck
					return

				$("#div-help").hide()	
				
				if $("#fastMode").is(':checked') 
					if $("#screen").html() == ""
						@goMR(1)
					else 
						$("#screen").html("")

				else
					
					@checkMR()
					$("#controlesMR1").show()


		$("#abrirMR1").change =>
			#alert();
			for i in [0..@todasConfiguracionesMR.length-1] 

				if i == parseInt($('#abrirMR1').val())
					poner = parseInt(@todasConfiguracionesMR[i][2])
					console.log poner
					$("#tiempoGo").html(poner)

		$("#autoplay").click =>
			@pasadas = 0
			$("#pasadasTxt").html(@pasadas)

			
			clearInterval(@killAutoplay)
			clearInterval(@killTimeout1)
			clearInterval(@killAS)
			clearInterval(@killAS1)


		$("#pasadasTxt").click =>
			@pasadas = 0
			$("#pasadasTxt").html(@pasadas)

			if $("#autoplay").is(':checked') or $("#randomActive").is(':checked')

				clearInterval(@killAutoplay)
				clearInterval(@killTimeout1)
				clearInterval(@killAS)
				clearInterval(@killAS1)

		$("#guardarMRBin").click =>
			for i in [0..7]
				txt = $("#binMR#{i}").val()
				if txt.length == 0
					alert("Debe completar todos los campos")
					return

			save = ""
			for i in [0..7]
				txt = $("#binMR#{i}").val()
				#arrayBase = myCookie.split(" ");
				save += txt 
				save += "|"
			
			save = save.substring(0, save.length-1)
			#localStorage.setItem("configAppLocalStorageFC", configApp);
			#$.cookie('initBin', save, { expires: 300 })
			localStorage.setItem("initBin", save);
			console.log save

			@iniciarBin()

		$("#contadorMR").click =>
			@contadorMR = 0
			$("#contadorMR").html(@contadorMR)

		$("#controlesMR1").hide()

		$("#nextMR").click =>
			$("#controlesMR1").hide()
			$("#screen").html("")
			#$("#checkMR").attr("disabled", true);
			@disableCheck = 1

		$('#verifyMR').msgbox
			content: 'jqueryscript.net'
			padding: 12

		$("#verifyMR").click =>
			@goMR(2)
			
		$("#goMR").click =>
			#$("#checkMR").attr("disabled", false);
			clearInterval(@killAutoplay)
			clearInterval(@killTimeout1)
			clearInterval(@killAS)
			clearInterval(@killAS1)

			@disableCheck = 0

			
			$("#contadorMR").html(@contadorMR)
			$("#div-help").hide()
			$("#div-configurar").hide()	
			$("#controlesMR1").hide()	

			
			@goMR(0)

		$("#checkMR").click =>
			if @disableCheck

				return

			$("#div-help").hide()	
			

			if $("#fastMode").is(':checked') 
				if $("#screen").html() == ""
					@goMR(1)
				else 
					$("#screen").html("")

			else

				@checkMR()
				$("#controlesMR1").show()
	
		$('#abrirMR').change =>

			@abrirMR()
			@configurarMR()


		$("#borrarMR").click =>

			if @todasConfiguracionesMR.length == 1
				return

			select = parseInt($("#abrirMR").val())

			if select == 0
				return

			save = ""
			
			auxTodasConfiguracionesMR = []

			for i in [0..@todasConfiguracionesMR.length-1] 

				if i != select
					

					save += @todasConfiguracionesMR[i][0] + "*" + @todasConfiguracionesMR[i][1]  + "*" + @todasConfiguracionesMR[i][2]  + "*" + @todasConfiguracionesMR[i][3]  + "*"

					for k in [0..@todasConfiguracionesMR[i][4].length-1]
						arrayAux = []
						arrayAux = @todasConfiguracionesMR[i][4][k]
						
						save += """#{parseInt(arrayAux[0])} #{parseInt(arrayAux[1])} #{parseInt(arrayAux[2])}"""

						save += "-"

					save = save.substring(0, save.length-1);
					
					save += "|"
			
			save = save.substring(0, save.length-1)


			@todasConfiguracionesMR = []
			@matrizMRConfiguracion = []
			#$.cookie('initMR', save, { expires: 300 })
			localStorage.setItem("initMR", save)

			$("#tiempoMR").val("500")
			$("#digitosMR").val("6")
			
			@selectedMRAccion = 0
			@iniciarMR()
	

		$("#borrarTodoMR").click =>

			if @todasConfiguracionesMR.length == 1
				return

			if confirm('Estás seguro que quieres borrar las configuraciones?')

				#$.removeCookie("initMR")
				localStorage.removeItem('initMR')

				@todasConfiguracionesMR = []
				@matrizMRConfiguracion = []

				$("#tiempoMR").val("500")
				$("#digitosMR").val("6")
				#$("#tipoMR select").val("0");
				$('#tipoMR option[value=0]').attr('selected','selected');

				@iniciarMR()
				
				
		$('#guardarMR').click =>

			select = parseInt($("#abrirMR").val())
			
			save = ""
			seleccionado = 0
			if select == 0
				
				for i in [0..@todasConfiguracionesMR.length-1] 
					save += @todasConfiguracionesMR[i][0] + "*" + @todasConfiguracionesMR[i][1]  + "*" + @todasConfiguracionesMR[i][2]  + "*" + @todasConfiguracionesMR[i][3]  + "*"

					for k in [0..@todasConfiguracionesMR[i][4].length-1] 
						arrayAux = []
						arrayAux = @todasConfiguracionesMR[i][4][k]
						# ...
						save += """#{parseInt(arrayAux[0])} #{parseInt(arrayAux[1])} #{parseInt(arrayAux[2])}"""

						
						save += "-"

					save = save.substring(0, save.length-1);

					save += "|"

				#possible = "BCDFGHJKLMNPQRSTVWXYZ"
				#possible1 = "AEIOU"

				#txt = possible.charAt( _.random(0,possible.length-1) ) + possible1.charAt( _.random(0,possible1.length-1) ) + possible.charAt( _.random(0,possible.length-1) ) 
				#nombre = txt
				
				swal {
				  title: 'Rapid Memory'
				  imageUrl: ''
				  text: 'Enter Name'
				  type: 'input'
				  showCancelButton: false
				  closeOnConfirm: true
				  animation: 'slide-from-top'
				  inputValue: ''
				  inputPlaceholder: ''
				}, (inputValue) =>

					name = inputValue
					nombre = name

					if nombre == ""
						return

					save += nombre + "*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*"

					for i in [0..$("#digitosMR").val()-1]
						
						save += """#{parseInt(@matrizMRConfiguracion[i][0])} #{parseInt(@matrizMRConfiguracion[i][1])} #{@matrizMRConfiguracion[i][2]}"""
						save += "-"

					save = save.substring(0, save.length-1);

					seleccionado = @todasConfiguracionesMR.length

					localStorage.setItem("initMR", save);

					@selectedMRAccion = seleccionado

					@todasConfiguracionesMR = []
					@matrizMRConfiguracion = []

					@cargarMR() #carga todas las configuraciones desde el cookie
					@abrirMR() #abre la configuración
					@configurarMR() #dibuja la configuracion abierta


				  #alert(inputValue);
				  #level = parseInt(inputValue)
				  #console.log 'level: ' + level
				  #alert(level);
				  #initGameMatrix()
				  #initSnake()
				  #gameMatrix[0][0][0]=1;
				  #dibujaMatrix();
				  #return

				return

				nombre = prompt("Enter name", "");
				if name=""
					return

				save += nombre + "*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*"

				for i in [0..$("#digitosMR").val()-1]
					
					save += """#{parseInt(@matrizMRConfiguracion[i][0])} #{parseInt(@matrizMRConfiguracion[i][1])} #{@matrizMRConfiguracion[i][2]}"""
					save += "-"

				save = save.substring(0, save.length-1);

				seleccionado = @todasConfiguracionesMR.length

			else
				seleccionado = select

				for i in [0..@todasConfiguracionesMR.length-1] 

					if i == select
					
						save += @todasConfiguracionesMR[i][0] + "*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*"

						for j in [0..$("#digitosMR").val()-1]
					
							save += """#{parseInt(@matrizMRConfiguracion[j][0])} #{parseInt(@matrizMRConfiguracion[j][1])} #{@matrizMRConfiguracion[j][2]}"""
							save += "-"

						save = save.substring(0, save.length-1);


					else

						save += @todasConfiguracionesMR[i][0] + "*" + @todasConfiguracionesMR[i][1]  + "*" + @todasConfiguracionesMR[i][2]  + "*" + @todasConfiguracionesMR[i][3]  + "*"

						for k in [0..@todasConfiguracionesMR[i][4].length-1] 
							arrayAux = []
							arrayAux = @todasConfiguracionesMR[i][4][k]
							

							save += """#{parseInt(arrayAux[0])} #{parseInt(arrayAux[1])} #{parseInt(arrayAux[2])}"""
							save += "-"

						save = save.substring(0, save.length-1);

					save += "|"

				save = save.substring(0, save.length-1);

				localStorage.setItem("initMR", save);

				@selectedMRAccion = seleccionado

				@todasConfiguracionesMR = []
				@matrizMRConfiguracion = []

				@cargarMR() #carga todas las configuraciones desde el cookie
				@abrirMR() #abre la configuración
				@configurarMR() #dibuja la configuracion abierta
				


			return
			#$.cookie('initMR', save, { expires: 300 });
			localStorage.setItem("initMR", save);

			@selectedMRAccion = seleccionado

			@todasConfiguracionesMR = []
			@matrizMRConfiguracion = []

			@cargarMR() #carga todas las configuraciones desde el cookie
			@abrirMR() #abre la configuración
			@configurarMR() #dibuja la configuracion abierta

			
		$('#unselectMR').click =>
			@matrizSeleccionMR = []

			$("#seleccionMR").val("")
			$("#siguienteMR").val("")
			
			@configurarMR()

		$('#addMR').click =>
					
			aux = parseInt($("#movimientoMR").val())
			aux += 1
			$("#movimientoMR").val(aux)
		
		$('#restMR').click =>
			aux = parseInt($("#movimientoMR").val())
			
			if aux != 0
				aux -= 1
			
			$("#movimientoMR").val(aux)

		$('#addMR1').click =>
					
			aux = parseInt($("#movimientoMR").val())
			aux += 10
			$("#movimientoMR").val(aux)
		
		$('#restMR1').click =>
			aux = parseInt($("#movimientoMR").val())
			
			if aux - 10 > 0
				aux -= 10
			
			$("#movimientoMR").val(aux)

		$('#upMR').click =>

			aux = parseInt($("#movimientoMR").val())
			
			for i in [0..@matrizSeleccionMR.length-1]

				@matrizMRConfiguracion[@matrizSeleccionMR[i]][1] -= aux 
				@matrizMRConfiguracion[@matrizSeleccionMR[i]][3] = 1 

			@configurarMR()

		$('#downMR').click =>

			aux = parseInt($("#movimientoMR").val())

			
			for i in [0..@matrizSeleccionMR.length-1]

				@matrizMRConfiguracion[@matrizSeleccionMR[i]][1] += aux 
				@matrizMRConfiguracion[@matrizSeleccionMR[i]][3] = 1 

			@configurarMR()

		$('#leftMR').click =>

			aux = parseInt($("#movimientoMR").val())

			
			for i in [0..@matrizSeleccionMR.length-1]

				@matrizMRConfiguracion[@matrizSeleccionMR[i]][0] -= aux 
				@matrizMRConfiguracion[@matrizSeleccionMR[i]][3] = 1 

			@configurarMR()

		$('#rightMR').click =>

			aux = parseInt($("#movimientoMR").val())

			for i in [0..@matrizSeleccionMR.length-1]

				@matrizMRConfiguracion[@matrizSeleccionMR[i]][0] += aux 
				@matrizMRConfiguracion[@matrizSeleccionMR[i]][3] = 1 

			@configurarMR()
					

		$('#restaDigitosMR').click =>
					
			aux = parseInt($("#digitosMR").val())
			aux -= 1
			$("#digitosMR").val(aux)
			@configurarMR()


		$('#sumaDigitosMR').click =>
			
			aux = parseInt($("#digitosMR").val())
			aux += 1
			$("#digitosMR").val(aux)
			@configurarMR()

		$('#digitosMR').change =>
			
			@configurarMR()

		$('#tipoMR').change =>
			@matrizMRConfiguracion = []
			@matrizSeleccionMR = []

			if parseInt($('#tipoMR').val()) == 3
				$('#digitosMR').val(8)
			if parseInt($('#tipoMR').val()) in [0,1,2]
				$('#digitosMR').val(6)
			
			$("#seleccionMR").val("")
			$("#siguienteMR").val("")

			@configurarMR()

		$('#siguienteMR').change =>
			aux = parseInt($("#siguienteMR").val())

			for i in [0..@matrizSeleccionMR.length-1]

				@matrizMRConfiguracion[@matrizSeleccionMR[i]][2] = aux 
				@matrizMRConfiguracion[@matrizSeleccionMR[i]][4] = 1 
			
			@configurarMR()
	
		$("#footer").hide()
		$("#timer").hide()

		#Mobile
		ua = navigator.userAgent.toLowerCase()
		isAndroid = 0
		isiPad = 0
		isiPhone = 0
		isAndroid = ua.indexOf('android') > -1
		isiPad = navigator.userAgent.match(/iPad/i) != null

		if navigator.userAgent.match(/iPhone/i) or navigator.userAgent.match(/iPod/i)
 			isiPhone = 1
	
		#!!
		#console.(window.screen.availHeight + "x" + window.screen.availWidth)

		#Movil
		###
		if window.screen.availWidth < 402
			
			$("#controlesMR").css("zoom", "350%")
			$("#footer").css("zoom", "200%")
			$("#myContadorSpan").hide()
			$("#myAutoShowSpan").hide()
			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);

			@correccionMovilY = 100

			$("#screen").css("zoom", "200%")

		if window.screen.availWidth == 768
			
			$("#controlesMR").css("zoom", "180%")
			$("#footer").css("zoom", "105%")
			$("#myContadorSpan").hide()
			$("#myAutoShowSpan").hide()
			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);

			@correccionMovilY = 0

			$("#screen").css("zoom", "150%")
		###

		###
		if window.screen.availWidth == 320 and isiPhone
		
			$("#controlesMR").css("zoom", "100%")
			$("#footer").css("zoom", "105%")
			$("#myContadorSpan").hide()
			$("#myAutoShowSpan").hide()
			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);

			@correccionMovilY = 0

			$("#screen").css("zoom", "100%")
		###
		###
		if window.screen.availWidth == 568 and isiPhone
		
			$("#controlesMR").css("zoom", "100%")
			$("#footer").css("zoom", "102%")
			$("#myContadorSpan").hide()
			$("#myAutoShowSpan").hide()
			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);

			@correccionMovilY = 0

			$("#screen").css("zoom", "100%")
		###

		###
		if window.screen.availWidth < 750 and window.screen.availWidth > 402
			

			$("#controlesMR").css("zoom", "180%")
			$("#footer").css("zoom", "105%")
			$("#myContadorSpan").hide()
			$("#myAutoShowSpan").hide()
			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);

			@correccionMovilY = 0

			$("#screen").css("zoom", "150%")
		###


		if window.screen.availWidth < 750 or isAndroid or isiPad or isiPhone

			$("#footer").show()

			$("#btn-z-id").css("font-size","150%")
			$("#btn-x-id").css("font-size","150%")
			$("#periY").val("5")

			$("#myOther").hide()
			#@restaYMR = 200

			@esMovil = 1

			if isiPad
				$("#footer").css("zoom", "105%")	

			myHeight1 = $("#footer").height()

		
			if window.screen.availWidth < 800 
				$("#fb-btn").html("");

				$("#control-configurar-div").height("30px")

				#$("#btn-z-id").css("zoom","30%")
				#$("#btn-x-id").css("zoom","30%")

				$("#btn-z-id").height("50px")
				$("#btn-x-id").height("50px")

				$("#screen").css("zoom", "50%")

				window.isMovilSystem = @esMovil

				window.helpText = "Simulador de Memoria rápida Web Experimental\nSoftware oficial en http://www.speed-memory.com/ \ncfg: Aagregar configuraciones de números\nAutoplay dispara las pruebas automáticamente con un intervalo de milisegundos estipulado. Para hacer pausa desactive autoplay.  \nExiste un limite de configuraciones que se puede cargar, aprox: 200 números entre todas las configuraciones\nContacto: robertchalean@gmail.com";

				ponerControlUsuarios()

				$("#fast-mode-txt").html("FM")
				$("#boton-conf").prop('value', 'cfg');

				@correccionMovilY = 80
				@topMovil = 1

				#control
				$("#goMR").hide()
				$("#checkMR").hide()
	
				#$("#myContadorSpan").hide()
				$("#myAutoShowSpan").hide()
				$("#myLimitSpan").hide()
				$("#select-td").hide()
				$("#delete-separator-span").hide()
				$("#myRandom").hide()

				#
				$("#zoom-span").show()

				$("#zoomMR").change =>
					
					if navigator.userAgent.match(/Windows Phone/i)
					
						z = 0
						switch $('#zoomMR').val()
							when "25" then z = 0.25 
							when "50" then z = 0.5
							when "75" then z = 0.75
							when "100" then z = 0.75
							when "150" then z = 1.5
							when "175" then z = 1.75
							when "200" then z = 2.00
							when "225" then z = 2.2

						$("#screen").css("transform","scale(#{z})")	
					else
						$("#screen").css("zoom","#{parseInt($('#zoomMR').val())}%")
						$(".container").css("zoom","#{parseInt($('#zoomMR').val())}%")
					
				#$("#screen").css("transform","scale(0.5)")	

				$("#select-span").html("""<input type="button" value="UnselectAll" id="unselectMR2">""")

				#$(".container").width("1024px");

				$('#unselectMR2').click =>
					@matrizSeleccionMR = []

					$("#seleccionMR").val("")
					$("#siguienteMR").val("")

					@configurarMR()
				
				#config
				$("#tamano-texto-td").hide()
				$("#guardar-bin-td").hide()
				$("#bin-controls-td").hide()
				$("#open-span").hide()
				$("#digits-configuration-span").hide()

				myHeight1 = parseInt($("#footer").height()) + 20

				$('#navegar').css
					#'position': 'fixed'
					'zoom': '100%'
					#'bottom': '#{myHeight1}px'
					'width': '100%'



				#$("#navegar").css("position", "fixed")	
				#$("#navegar").css("bottom", "#{myHeight1}px")

				myHeight2 = parseInt($("#footer").height()) # + parseInt($("#navegar").height()) + 40

				#alert(myHeight2);
	
				$('#control-config').css
					#'position': 'fixed'
					'zoom': '125%'
					#'bottom': '#{myHeight2}px'
					'rigth': '0px'

				$("#control-config").css("position", "fixed")	
				$("#control-config").css("bottom", "#{myHeight2}px")
				$("#control-config").css("right", "0px")
				
				$("#numeros-configuracion-div").css("position", "fixed")

				$("#limitautoplay").prop('checked', false);
				
				###
				
				$("#navegar").css({	
					'position' : 'fixed',
					'zoom' : '150%',
					'#bottom' : '#{myHeight1}',
					'margin-bottom' : '0px',
					'width' : '100%'
				});	
				###

		#Kindle hd
		if window.screen.availWidth == 2560
			@restaYMR = 0
			@myZoom = "400%"

		#console.log(document.images.length);
		
		#!!!
		$("#div-configurar").hide()

		$("#boton-guardar").click =>
			$("#div-configurar").hide()

		$("#boton-conf").click =>	
			$("#screen").html("")
			$("#controlesMR1").hide()

			if $("#div-configurar").is(':visible')
				$("#div-configurar").hide()
			else 
				$("#div-configurar").show()


		$( "#btn-z-id" ).click  =>

			if @bMRGo
				
				$("#contadorMR").html(@contadorMR)
				$("#div-help").hide()
				$("#div-configurar").hide()	
				@goMR(0)
			else 
				@checkPosicion(true)

		$( "#btn-x-id" ).click  =>
			

			if @bMRGo
				
				$("#div-help").hide()	

				if $("#fastMode").is(':checked') 
					@goMR(1)
				else
					@checkMR()
					$("#controlesMR1").show()
			else
				@checkPosicion(false)
	
		document.body.style.zoom = @myZoom

	iniciarBin : () ->
		#myCookie = $.cookie('initBin')

		myCookie = localStorage.getItem("initBin")
		#console.log myCookie

		if not (myCookie?) #si no hay cokie

			save = "r|t d|f|n|c k|l|s z|m"
			#$.cookie('initBin', save, { expires: 300 })
			localStorage.setItem("initBin", save);

			@iniciarBin()

			return

		k = 0

		arrayBase = []
		arrayBase1 = []

		arrayBase = myCookie.split("|");
		
		for i in [0..arrayBase.length-1] 

			@arrayMRBin[i] = []
			txt = arrayBase[i]

			arrayBase1 = txt.split(" ")

			$("#binMR#{i}").val(txt) 

			for j in [0..arrayBase1.length-1] 
				str = arrayBase1[j] + " "

			
				@arrayMRBin[i][j] = str.charCodeAt(0)

		#console.log(@arrayMRBin)

	checkMR : () ->	

		
		@mostrarValores = 1
		#alert();
		@disableCheck = 1
		
		for i in [0..@digitosMRGo-1]
			if @tipoMRGo == 2
				@resultadosMRGo[i] = $("#respuestaMRId#{i}").val()
			else 
				@resultadosMRGo[i] = parseInt($("#respuestaMRId#{i}").val())

		#3,6,9,12,15,18,21,24,27,30
		emptyColumsDec = [2,4,6,8,10,12,14,16,18,20]
		emptyColumBin = [3,6,9,12,15,18]
		emptyColumsLetters = [2,4,7,12,13,16,19,22,25,28]

		possible = "abcdefghijklmnopqrstuvwxyz"
		txt = possible.charAt( _.random(0,possible.length-1) )

		possible1 = "0123456789"
		possible2 = "101010"
		possible3 = "010101"

		maxColumnsDec = 22
		maxColumnsBin = 21	
		maxColumnsLetters = 22	

		iSpace = 30
		jSpace = 30

		
		imprimir = ""
		
		inicioCuadro = $("#screen").position()
		inicioCuadro = inicioCuadro.top 


		#dec

		if @tipoMRGo == 0
			
			emptyColumns = emptyColumsDec
			ponerPossible = possible1
			finL = 10

		#bin6
		if @tipoMRGo == 1
			emptyColumns = emptyColumBin
			ponerPossible = possible2
			finL = 5

		#letter

		if @tipoMRGo == 2
			emptyColumns = emptyColumsDec
			ponerPossible = possible
			finL = 26
		
		l = 0

		#Letras o números
		if @tipoMRGo == 0 or @tipoMRGo == 2
		
			k = 0
			
			for i in [0..20] 
				auxSuma = 0
				for j in [0..19]

					if l == finL
						l = 0

					if k < @digitosMRGo	

						#es null
						if not (@matrizMRConfiguracionGo[k]?)

							@matrizMRConfiguracionGo[k] = []

						if _.find(emptyColumns, (num) => num == j)
							auxSuma += jSpace

						myX = 20+j*jSpace+auxSuma
						myY = inicioCuadro+i*iSpace
						

						if parseInt(@matrizMRConfiguracionGo[k][4]) == 1
							@matrizMRConfiguracionGo[k][2] 
							
						else
							@matrizMRConfiguracionGo[k][2] = k + 1
							@matrizMRConfiguracionGo[k][4] = 0 

						if parseInt(@matrizMRConfiguracionGo[k][3]) == 1
							
							myX = @matrizMRConfiguracionGo[k][0] 
							myY = @matrizMRConfiguracionGo[k][1]  

						else
							@matrizMRConfiguracionGo[k][3] = 0 
							@matrizMRConfiguracionGo[k][0] = myX
							@matrizMRConfiguracionGo[k][1] = myY

						color = "red"
						poner = @resultadosMRGo[k]

						if isNaN(@resultadosMRGo[k]) 
							poner = "-"

						else

							if parseInt(@matrizMRConfiguracionGo[k][5]) == parseInt(@resultadosMRGo[k])
								color = "green"


						if @tipoMRGo == 2 
							auxTxt = @resultadosMRGo[k]
							if auxTxt.length == 0

								poner = "-"
							else
								poner = @resultadosMRGo[k]

							if @matrizMRConfiguracionGo[k][5] == @resultadosMRGo[k]
								color = "green"

						#console.log @resultadosMRGo[k]

						imprimir += """
							<div class="element" id="myElementGo#{k}"  style="margin-left: #{myX}px; top: #{myY-(100+@restaYMR-@correccionMovilY)}px; font-size: 40px;"> 					
									<b> <font color="#{color}">#{ poner }  </font> </b>
							</div>	
							"""

						k++; l++;
						
					else
						break

				if k > @digitosMRGo
					break
		

		#binarios

		if @tipoMRGo == 1 or @tipoMRGo == 3
			k = 0

			fPossible = 1
		
			mResta = 1
			ii = 0
			jj = 0

			for i in [0..4] 

				auxSuma = 0
				mResta = 1
				jj = 0
				fModif = 1

				for j in [0..41]

					if k < @digitosMRGo	

						if not (@matrizMRConfiguracionGo[k]?)

							@matrizMRConfiguracionGo[k] = []			

						if k % 6 == 0 	
							l = 0
							
							if fPossible 
								ponerPossible = possible2
								fPossible = 0
							else 
								ponerPossible = possible3
								fPossible = 1

							if j != 0

								auxSuma += jSpace


						if k % 3 == 0 and j != 0

							if fModif 
								fModif = 0
								ii++
								jj -= 3


							else
								fModif = 1
								ii--		


						myX = 20+jj*jSpace+auxSuma
						myY = inicioCuadro+ii*iSpace	


						if parseInt(@matrizMRConfiguracionGo[k][4]) == 1
							@matrizMRConfiguracionGo[k][2] 
							
						else
							@matrizMRConfiguracionGo[k][2] = k + 1
							@matrizMRConfiguracionGo[k][4] = 0 

						# @matrizMRConfiguracion[k][2] = k + 1
						# @matrizMRConfiguracion[k][4] = 0 

						if parseInt(@matrizMRConfiguracionGo[k][3]) == 1
							
							myX = @matrizMRConfiguracionGo[k][0] 
							myY = @matrizMRConfiguracionGo[k][1]  

						else
							@matrizMRConfiguracionGo[k][3] = 0 
							@matrizMRConfiguracionGo[k][0] = myX
							@matrizMRConfiguracionGo[k][1] = myY							

						#console.log("k:" + k + "|ii:" + ii + "|jj:" + jj)

						color = "red"
						poner = @resultadosMRGo[k]
						if isNaN(@resultadosMRGo[k])
							poner = "-"
						else

							if parseInt(@matrizMRConfiguracionGo[k][5]) == @resultadosMRGo[k]
								color = "green"


						#console.log @resultadosMRGo[k]

						imprimir += """
							<div class="element" id="myElementGo#{k}"  style="margin-left: #{myX}px; top: #{myY-(100+@restaYMR-@correccionMovilY)}px; font-size: 40px;"> 					
									<b> <font color="#{color}">#{ poner }  </font> </b>
							</div>	
							"""

						k++; l++;

						
						jj++
						
					else
						break
				ii += 1

				if k > @digitosMRGo
					break


		$("#screen").html(imprimir)

	respuestaMR : () ->	

		

		#3,6,9,12,15,18,21,24,27,30
		emptyColumsDec = [2,4,6,8,10,12,14,16,18,20]
		emptyColumBin = [3,6,9,12,15,18]
		emptyColumsLetters = [2,4,7,12,13,16,19,22,25,28]

		possible = "abcdefghijklmnopqrstuvwxyz"
		txt = possible.charAt( _.random(0,possible.length-1) )

		possible1 = "0123456789"
		possible2 = "101010"
		possible3 = "010101"

		maxColumnsDec = 22
		maxColumnsBin = 21	
		maxColumnsLetters = 22	

		iSpace = 30
		jSpace = 30

		
		imprimir = ""
		
		inicioCuadro = $("#screen").position()
		inicioCuadro = inicioCuadro.top 

		#dec

		if @tipoMRGo == 0
			
			emptyColumns = emptyColumsDec
			ponerPossible = possible1
			finL = 10

		#bin
		if @tipoMRGo == 1
			emptyColumns = emptyColumBin
			ponerPossible = possible2
			finL = 5

		#letter

		if @tipoMRGo == 2
			emptyColumns = emptyColumsDec
			ponerPossible = possible
			finL = 26
		
		l = 0

		#Letras o números
		if @tipoMRGo == 0 or @tipoMRGo == 2
		
			k = 0
			
			for i in [0..20] 
				auxSuma = 0
				for j in [0..19]

					if l == finL
						l = 0

					if k < @digitosMRGo	

						#es null
						if not (@matrizMRConfiguracionGo[k]?)

							@matrizMRConfiguracionGo[k] = []

						if _.find(emptyColumns, (num) => num == j)
							auxSuma += jSpace

						myX = 20+j*jSpace+auxSuma
						myY = inicioCuadro+i*iSpace
						

						if parseInt(@matrizMRConfiguracionGo[k][4]) == 1
							@matrizMRConfiguracionGo[k][2] 
							
						else
							@matrizMRConfiguracionGo[k][2] = k + 1
							@matrizMRConfiguracionGo[k][4] = 0 

						if parseInt(@matrizMRConfiguracionGo[k][3]) == 1
							
							myX = @matrizMRConfiguracionGo[k][0] 
							myY = @matrizMRConfiguracionGo[k][1]  

						else
							@matrizMRConfiguracionGo[k][3] = 0 
							@matrizMRConfiguracionGo[k][0] = myX
							@matrizMRConfiguracionGo[k][1] = myY

						imprimir += """
							<div class="element" id="myElementGo#{k}"  style="margin-left: #{myX}px; top: #{myY-(95+@restaYMR-@correccionMovilY)}px;"> 					
									<input type="text" name="respuestaMR#{k}" value="" style="width: #{@widthGo+10}px; font-size: 20px;" id="respuestaMRId#{k}" maxlength="1">
							</div>	
							""" 
						k++; l++;
						
					else
						break

				if k > @digitosMRGo
					break
		

		#binarios

		if @tipoMRGo == 1 or @tipoMRGo == 3 
			k = 0

			fPossible = 1
		
			mResta = 1
			ii = 0
			jj = 0

			for i in [0..4] 

				auxSuma = 0
				mResta = 1
				jj = 0
				fModif = 1

				for j in [0..41]

					if k < @digitosMRGo	

						if not (@matrizMRConfiguracionGo[k]?)

							@matrizMRConfiguracionGo[k] = []			

						if k % 6 == 0 	
							l = 0
							
							if fPossible 
								ponerPossible = possible2
								fPossible = 0
							else 
								ponerPossible = possible3
								fPossible = 1

							if j != 0

								auxSuma += jSpace


						if k % 3 == 0 and j != 0

							if fModif 
								fModif = 0
								ii++
								jj -= 3


							else
								fModif = 1
								ii--		


						myX = 20+jj*jSpace+auxSuma
						myY = inicioCuadro+ii*iSpace	


						if parseInt(@matrizMRConfiguracionGo[k][4]) == 1
							@matrizMRConfiguracionGo[k][2] 
							
						else
							@matrizMRConfiguracionGo[k][2] = k + 1
							@matrizMRConfiguracionGo[k][4] = 0 

						# @matrizMRConfiguracion[k][2] = k + 1
						# @matrizMRConfiguracion[k][4] = 0 

						if parseInt(@matrizMRConfiguracionGo[k][3]) == 1
							
							myX = @matrizMRConfiguracionGo[k][0] 
							myY = @matrizMRConfiguracionGo[k][1]  

						else
							@matrizMRConfiguracionGo[k][3] = 0 
							@matrizMRConfiguracionGo[k][0] = myX
							@matrizMRConfiguracionGo[k][1] = myY							

						#console.log("k:" + k + "|ii:" + ii + "|jj:" + jj)

						imprimir += """
							<div class="element" id="myElementGo#{k}"  style="margin-left: #{myX}px; top: #{myY-(95+@restaYMR-@correccionMovilY)}px;"> 
								<input type="text" name="respuestaMR{k}" value=""  style="width: #{@widthGo+10}px; font-size: 20px;" id="respuestaMRId#{k}" maxlength="1">
							</div>	
							"""

						k++; l++;

						
						jj++
						
					else
						break
				ii += 1

				if k > @digitosMRGo
					break


		$("#screen").html(imprimir)

		$("#respuestaMRId0").focus();



		for x in [0..@digitosMRGo-1]


			siguiente = @matrizMRConfiguracionGo[x][2]
			siguiente2 = siguiente


			if x == 0
				anterior = @matrizMRConfiguracionGo[@digitosMRGo-2][2]
			
			else 	
				if x == 1
					anterior = 0
				else 
					anterior = @matrizMRConfiguracionGo[x-2][2]

			if x == @digitosMRGo-1
				siguiente2 = 0

			eval("""

				//$("#respuestaMRId#{x}").focus(function() { $(this).select() });
				
				/*
				$("#respuestaMRId#{x}").focus(function() { 
					
					if($("#respuestaMRId#{x}").val()!=""){
						setTimeout(function() {$("#respuestaMRId#{x}").select(); }, 0);

					} 

					
					

				});*/

				$("#respuestaMRId#{x}").keydown(function(e) {
					
					if (parseInt(e.which)==39){
						$("#respuestaMRId#{siguiente2}").focus();
						setTimeout(function() {$("#respuestaMRId#{siguiente2}").select();}, 5);

					}
					if (parseInt(e.which)==37){
						$("#respuestaMRId#{anterior}").focus();
						setTimeout(function() {$("#respuestaMRId#{anterior}").select();}, 5);

					}

				});

				$("#respuestaMRId#{x}").keypress(function(event) {

					if((#{x} == #{@digitosMRGo-1}) && (parseInt(event.which)!=13) ){
						$("#respuestaMRId#{x}").val("");

					}


					binTxt = ["000", "001", "010", "011", "100", "101", "110", "111"]; 
					
					if (window.juegoReaction.tipoMRGo == 1) {

						for(i=0;i<8;i++){

							for(j=0;j<window.juegoReaction.arrayMRBin[i].length;j++){

								//console.log(window.juegoReaction.arrayMRBin[i][j]);

								if (parseInt(event.which) == parseInt(window.juegoReaction.arrayMRBin[i][j])){

									str = binTxt[i];

		  							$("#respuestaMRId#{x+3}").focus();

		  							setTimeout(function(){

									$("#respuestaMRId#{x}").val(str.charAt(0));
		  							$("#respuestaMRId#{x+1}").val(str.charAt(1));
		  							$("#respuestaMRId#{x+2}").val(str.charAt(2));



		  							},5);
	  							
	  								return;


								}

							}

						}

					}
						setTimeout(function() {$("#respuestaMRId#{siguiente}").select();}, 5);
						setTimeout(function() {$("#respuestaMRId#{siguiente}").focus();}, 6);

					
				});
				$("#respuestaMRId#{x}").click(function(e) {

					setTimeout(function() {$("#respuestaMRId#{x}").select(); }, 5);

				});
			""")

	goMR : (accion) ->
		#console.log accion

		selectedItem = 0

		if accion == 0
			kk = 0
			if $("#randomActive").is(':checked')
				for i in [0..@todasConfiguracionesMR.length-1] 
					if $("#itemRandom#{i}").is(':checked')
						@arrayGoActivos[kk] = i
						kk++


				#console.log @arrayGoActivos

				selectedItem = @arrayGoActivos[_.random(0,@arrayGoActivos.length-1)]

				$('#abrirMR1').val(selectedItem);
				#console.log $('#abrirMR1').val(selectedItem);

				@ch1 = parseInt($("#itemRandomText1#{selectedItem}").val())
				@ch2 = parseInt($("#itemRandomText2#{selectedItem}").val())
				@tAutoplay = parseInt($("#itemRandomText#{selectedItem}").val())

				poner = parseInt(@todasConfiguracionesMR[selectedItem][2])
				$("#tiempoGo").html(poner)

				#console.log  parseInt($('#abrirMR1').val())
			else 

				@ch1 = parseInt($('#tiempoAutoshow').val())
				@ch2 = parseInt($('#tiempoAutoshow1').val())
				@tAutoplay = parseInt($('#tiempoAutoplay').val())

		console.log ("item:" + selectedItem + " ch1:" + @ch1 + " ch2:" + @ch2 + " tAutoplay:" + @tAutoplay)

		@contadorMR++
		$("#contadorMR").html(@contadorMR)

		if ($("#autoplay").is(':checked') or $("#randomActive").is(':checked'))  and $("#limitautoplay").is(':checked') 
			@pasadas++; $("#pasadasTxt").html(@pasadas)

		#3,6,9,12,15,18,21,24,27,30
		emptyColumsDec = [2,4,6,8,10,12,14,16,18,20]
		emptyColumBin = [3,6,9,12,15,18]
		emptyColumsLetters = [2,4,7,12,13,16,19,22,25,28]

		possible = "abcdefghijklmnopqrstuvwxyz"
		possible1 = "0123456789"
		possible2 = "10"

		maxColumnsDec = 22
		maxColumnsBin = 21	
		maxColumnsLetters = 22	

		iSpace = 30
		jSpace = 30 

		imprimir = ""
		imprimir2 = ""
		
		inicioCuadro = $("#screen").position()
		inicioCuadro = inicioCuadro.top 

		#alert(inicioCuadro);

		@selectedMRAccion = parseInt($('#abrirMR1').val())

		k = 0

		#console.log @todasConfiguracionesMR

		for i in [0..@todasConfiguracionesMR.length-1] 

			if i == parseInt($('#abrirMR1').val())

				@tipoMRGo = parseInt(@todasConfiguracionesMR[i][1])
				@tiempoMRGo = parseInt(@todasConfiguracionesMR[i][2])
				@digitosMRGo = parseInt(@todasConfiguracionesMR[i][3])

				#console.log @tiempoMRGo

				#dec
				if @tipoMRGo == 0
					ponerPossible = possible1
				#bin
				if @tipoMRGo == 1
					ponerPossible = possible2
				#letter
				if @tipoMRGo == 2
					ponerPossible = possible

				if @tipoMRGo == 3
					ponerPossible = possible2

				for j in [0..@todasConfiguracionesMR[i][4].length-1] 

					if not accion
						@matrizMRConfiguracionGo[k] = []
					
					#simplifica mucho el codigo
					arrayAux = []
					arrayAux = @todasConfiguracionesMR[i][4][j]
					
					@matrizMRConfiguracionGo[k][0] = parseInt(arrayAux[0])
					@matrizMRConfiguracionGo[k][1] = parseInt(arrayAux[1])
					@matrizMRConfiguracionGo[k][2] = parseInt(arrayAux[2])
					@matrizMRConfiguracionGo[k][3] = 1
					@matrizMRConfiguracionGo[k][4] = 1

					if accion  == 1 or accion == 2
						txt = @matrizMRConfiguracionGo[k][5]
					else
						txt = ponerPossible.charAt( _.random(0,ponerPossible.length-1) ) 
					
					@matrizMRConfiguracionGo[k][5] = txt

					k++

				break

		#dec

		if @tipoMRGo == 0
			
			emptyColumns = emptyColumsDec
			ponerPossible = possible1
			finL = 10

		#bin
		if @tipoMRGo == 1
			emptyColumns = emptyColumBin
			ponerPossible = possible2
			finL = 5

		#letter

		if @tipoMRGo == 2
			emptyColumns = emptyColumsDec
			ponerPossible = possible
			finL = 26
		
		l = 0

		menosY = 100
		if accion == 2
			menosY = 250

		#Letras o números
		if @tipoMRGo == 0 or @tipoMRGo == 2
		
			k = 0
			
			for i in [0..20] 
				auxSuma = 0
				for j in [0..19]

					if l == finL
						l = 0

					if k < @digitosMRGo	

						#es null
						if not (@matrizMRConfiguracionGo[k]?)

							@matrizMRConfiguracionGo[k] = []

						if _.find(emptyColumns, (num) => num == j)
							auxSuma += jSpace

						myX = 20+j*jSpace+auxSuma
						myY = inicioCuadro+i*iSpace
						

						if parseInt(@matrizMRConfiguracionGo[k][4]) == 1
							@matrizMRConfiguracionGo[k][2] 
							
						else
							@matrizMRConfiguracionGo[k][2] = k + 1
							@matrizMRConfiguracionGo[k][4] = 0 

						if parseInt(@matrizMRConfiguracionGo[k][3]) == 1
							
							myX = @matrizMRConfiguracionGo[k][0] 
							myY = @matrizMRConfiguracionGo[k][1]  

						else
							@matrizMRConfiguracionGo[k][3] = 0 
							@matrizMRConfiguracionGo[k][0] = myX
							@matrizMRConfiguracionGo[k][1] = myY

						myPosition = ""
						if accion == 2
							@restaYMR = 120
							menosY = 0
							myPosition = "position: absolute !important;"
						else
							@restaYMR = 0;

						#console.log myY-(menosY+@restaYMR)
						#console.log "myY " + myY
						#console.log "restaYMR " + @restaYMR

						myY = parseInt(myY)

						#console.log ("myY: " + myY + " menosY: " + menosY + " restaYMR:" + @restaYMR + " correccionMovilY:" + @correccionMovilY )
						#console.log "myY-(menosY+@restaYMR-@correccionMovilY)"
						#console.log ("total: " + parseInt( myY-(menosY+@restaYMR-@correccionMovilY) ) )
						#alert(parseInt( myY-(menosY+@restaYMR-@correccionMovilY) ) )

						imprimir += """
							<div class="element" id="myElementGo#{k}"  style="#{myPosition} margin-left: #{myX}px; top: #{parseInt(myY-(menosY+@restaYMR-@correccionMovilY))}px;  font-size: 40px;"> 					
									<b> #{ @matrizMRConfiguracionGo[k][5] }  </b>
							</div>	
							"""

						imprimir2 += "#{ @matrizMRConfiguracionGo[k][5] } - "
						k++; l++;
						
					else
						break

				if k > @digitosMRGo
					break
		
		

		#binarios
		if @tipoMRGo == 1 or @tipoMRGo == 3
			
			k = 0

			fPossible = 1
		
			mResta = 1
			ii = 0
			jj = 0

			for i in [0..4] 

				auxSuma = 0
				mResta = 1
				jj = 0
				fModif = 1

				for j in [0..41]

					if k < @digitosMRGo	

						if not (@matrizMRConfiguracionGo[k]?)

							@matrizMRConfiguracionGo[k] = []			

						if k % 6 == 0 	
							l = 0
							
							if fPossible 
								
								fPossible = 0
							else 
								
								fPossible = 1

							#console.log("--------------------------")

							if j != 0

								auxSuma += jSpace


						if k % 3 == 0 and j != 0

							if fModif 
								fModif = 0
								ii++
								jj -= 3


							else
								fModif = 1
								ii--		


						myX = 20+jj*jSpace+auxSuma
						myY = inicioCuadro+ii*iSpace	


						if parseInt(@matrizMRConfiguracionGo[k][4]) == 1
							@matrizMRConfiguracionGo[k][2] 
							
						else
							@matrizMRConfiguracionGo[k][2] = k + 1
							@matrizMRConfiguracionGo[k][4] = 0 

						# @matrizMRConfiguracion[k][2] = k + 1
						# @matrizMRConfiguracion[k][4] = 0 

						if parseInt(@matrizMRConfiguracionGo[k][3]) == 1
							
							myX = @matrizMRConfiguracionGo[k][0] 
							myY = @matrizMRConfiguracionGo[k][1]  

						else
							@matrizMRConfiguracionGo[k][3] = 0 
							@matrizMRConfiguracionGo[k][0] = myX
							@matrizMRConfiguracionGo[k][1] = myY	

						myPosition = ""
						if accion == 2
							@restaYMR = 120
							menosY = 0
							myPosition = "position: absolute !important;"
						else
							@restaYMR = 0;

						#console.log("k:" + k + "|ii:" + ii + "|jj:" + jj)

						imprimir += """
							<div class="element" id="myElementGo#{k}"  style="#{myPosition} margin-left: #{myX}px; top: #{myY-(menosY+@restaYMR-@correccionMovilY)}px; font-size: 40px;"> 
								<b>#{ @matrizMRConfiguracionGo[k][5] }</b>
							</div>	
							"""
						imprimir2 += "#{ @matrizMRConfiguracionGo[k][5] } - "

						k++; l++;

						
						jj++
						
					else
						break
				ii += 1

				if k > @digitosMRGo
					break
		#console.log  imprimir2
		
		myDivIdContent = "#screen"
		if accion == 2
			myDivIdContent = ".jMsgbox-loaded"
		$("#{myDivIdContent}").html(imprimir)

		@widthGo = $("#testLetter").width()
		#alert(@widthGo)

		if accion == 0
			@mostrarValores = 0

			killTimeout1 = setTimeout ( =>
							#$("#checkMR").show()
							#$('#checkMR').prop('disabled', false);

							if $("#fastMode").is(':checked') 

								$("#screen").html("")

								if $("#autoshow").is(':checked') or ($("#randomActive").is(':checked') and @ch1!=0)
									@killAS = setTimeout ( =>
										@goMR(1)

										if @ch2 != 0 or ($("#randomActive").is(':checked') and @ch2!=0)
											@killAS1 = setTimeout ( =>

												$("#screen").html("")

											), @ch2 * 1000

									), @ch1 * 1000

							else
								$("#screen").html("")

								killTimeout1 = setTimeout ( =>
									@respuestaMR()

									if $("#autoshow").is(':checked') or ($("#randomActive").is(':checked') and @ch1!=0)
										@killAS = setTimeout ( =>

											if not @disableCheck
												@checkMR()
												$("#controlesMR1").show()

											if @ch2 != 0 or ($("#randomActive").is(':checked') and @ch2!=0)
												@killAS1 = setTimeout ( =>

													$("#screen").html("")
													$("#controlesMR1").hide()
													
													@disableCheck = 0

												), @ch2 * 1000

										), @ch1 * 1000

								), 2000



							if $("#autoplay").is(':checked') or $("#randomActive").is(':checked')
								@killAutoplay = setTimeout ( =>
							
									if $("#limitautoplay").is(':checked') 
																		
										if @pasadas == parseInt($("#cantidadLimitAutoplay").val()) 
											@pasadas = 0; 

											return

									@goMR(0)
									
								), @tAutoplay

						), @tiempoMRGo

	checkboxAction : (accion,name,cantidad,yy) ->

		#all
		if accion == "all"

			for xx in [0..cantidad]
			
				$("##{name}#{xx}").prop('checked', true);

		#random
		if accion == "random"
			for xx in [0..cantidad]
				if _.random(0,1)
					$("##{name}#{xx}").prop('checked', true);
				else
					$("##{name}#{xx}").prop('checked', false);

		if accion == "quitar"

			for xx in [0..cantidad]
				if $("##{name}#{xx}").is(':checked') 
					$("##{name}#{xx}").prop('checked', false);

			$("##{name}#{yy}").prop('checked', true);
		

	abrirMR : () ->	

		@matrizMRConfiguracion = []

		@selectedMRAccion = parseInt($('#abrirMR').val())

		k = 0

		for i in [0..@todasConfiguracionesMR.length-1] 

			if i == parseInt($('#abrirMR').val())

				$('#tipoMR').val(@todasConfiguracionesMR[i][1])
				$('#tiempoMR').val(@todasConfiguracionesMR[i][2])
				$('#digitosMR').val(@todasConfiguracionesMR[i][3])

				
				for j in [0..@todasConfiguracionesMR[i][4].length-1] 

					@matrizMRConfiguracion[k] = []
					
					#simplifica mucho el codigo
					arrayAux = []
					arrayAux = @todasConfiguracionesMR[i][4][j]
					
					@matrizMRConfiguracion[k][0] = parseInt(arrayAux[0])
					@matrizMRConfiguracion[k][1] = parseInt(arrayAux[1])
					@matrizMRConfiguracion[k][2] = parseInt(arrayAux[2])
					@matrizMRConfiguracion[k][3] = 1
					@matrizMRConfiguracion[k][4] = 1

					k++

				break

		@matrizSeleccionMR = []

		$("#seleccionMR").val("")
		$("#siguienteMR").val("")

		$('#abrirMR').html('');
		
		for i in [0..@todasConfiguracionesMR.length-1] 

			select = ""
			if i == @selectedMRAccion
				select = "  selected"

			$('#abrirMR').append("""<option value="#{i}" #{select}>#{@todasConfiguracionesMR[i][0]}</option>"""); 

		$('#abrirMR1').html('');
		
		for i in [0..@todasConfiguracionesMR.length-1] 

			select = ""
			if i == 0
				select = "  selected"

			$('#abrirMR1').append("""<option value="#{i}" #{select}>#{@todasConfiguracionesMR[i][0]}</option>"""); 


	iniciarMR : () ->

		@configurarMR()
		
		if userId == 0
			
			#myCookie = $.cookie('initMR')
			myCookie = localStorage.getItem("initMR")

			if not (myCookie?) #si no hay cokie

				save = "Nuevo*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*"

				for i in [0..@matrizMRConfiguracion.length-1]
					
					save += """#{parseInt(@matrizMRConfiguracion[i][0])} #{parseInt(@matrizMRConfiguracion[i][1])} #{@matrizMRConfiguracion[i][2]}"""

					if i != @matrizMRConfiguracion.length-1
						save += "-"

				seleccionado = @todasConfiguracionesMR.length

				#$.cookie('initMR', save, { expires: 300 });
				localStorage.setItem("initMR", save)
	
			
			@cargarMR()

			$("#configuraciones-mr").val(myCookie)
		else

			$.post('/cargarConfiguracionesMr', {}).done (data) =>
				alert(data)

				$("#configuraciones-mr").val(data)
				cargaConfiguracionesMr = data

				@cargarMR()

				$('#abrirMR1').prop('disabled', false)
				return

	cargarMR : () ->	

		
		if userId == 0
			#myCookie = $.cookie('initMR')
			myCookie = localStorage.getItem("initMR")
		else
			myCookie = cargaConfiguracionesMr
	

		# if (myCookie?) #si hay cokie
		# 	console.log $.cookie('initMR')
		@todasConfiguracionesMR = []

		k = 0

		arrayBase = []

		arrayBase = myCookie.split("|");
		
		for i in [0..arrayBase.length-1] 

			auxBase = arrayBase[i]
			arrayBase1 = auxBase.split("*")

			@todasConfiguracionesMR[k] = []

			@todasConfiguracionesMR[k][0] = arrayBase1[0] #nombre
			@todasConfiguracionesMR[k][1] = arrayBase1[1] #tipo
			@todasConfiguracionesMR[k][2] = arrayBase1[2] #tiempo
			@todasConfiguracionesMR[k][3] = arrayBase1[3] #cantidad
			@todasConfiguracionesMR[k][5] = arrayBase1[5] #id
			@todasConfiguracionesMR[k][5] = 0

			auxBase1 = arrayBase1[4]
			arrayBase2 = auxBase1.split("-")

			@todasConfiguracionesMR[k][4] = []

			for j in [0..arrayBase2.length-1] 
				@todasConfiguracionesMR[k][4][j] = []

				auxBase2 = arrayBase2[j]
				arrayBase3 = auxBase2.split(" ")

				@todasConfiguracionesMR[k][4][j][0] = arrayBase3[0] 
				@todasConfiguracionesMR[k][4][j][1] = arrayBase3[1]
				@todasConfiguracionesMR[k][4][j][2] = arrayBase3[2]

			k++

		j++
		k--

		#console.log @todasConfiguracionesMR
		# @todasConfiguracionesMR[k][4][j] = []

		# @todasConfiguracionesMR[k][4][j][0] = 0
		# @todasConfiguracionesMR[k][4][j][1] = 0
		# @todasConfiguracionesMR[k][4][j][2] = 0

		$('#abrirMR').html('');
		
		for i in [0..@todasConfiguracionesMR.length-1] 

			select = ""
			if i == @selectedMRAccion
				select = "  selected"

			$('#abrirMR').append("""<option value="#{i}" #{select}>#{@todasConfiguracionesMR[i][0]}</option>"""); 

		$('#abrirMR1').html('');

		$('#lista').html("")
		
		for i in [0..@todasConfiguracionesMR.length-1] 

			select = ""
			if i == 0
				select = "  selected"

			$('#abrirMR1').append("""<option value="#{i}" #{select}>#{@todasConfiguracionesMR[i][0]}</option>"""); 
			$('#lista').append("""<div><input type="checkbox" id="itemRandom#{i}" checked><div style="width: 50px !important; float: left;">#{@todasConfiguracionesMR[i][0].substring(0,10)}</div><input type="text" style="width: 35px;" value="#{1000}" id="itemRandomText#{i}">ms<input type="text" style="width: 20px;" value="0" id="itemRandomText1#{i}">s<input type="text" style="width: 20px;" value="0" id="itemRandomText2#{i}">s</div><br>"""); 

		$("#randomAll").click =>
			@checkboxAction("all","itemRandom",@todasConfiguracionesMR.length-1,-1)
		$("#randomNone").click =>
			@checkboxAction("quitar","itemRandom",@todasConfiguracionesMR.length-1,-1)
		$("#randomRandom").click =>
			@checkboxAction("random","itemRandom",@todasConfiguracionesMR.length-1,-1)

		$("#setAllRandom").click =>
			for i in [0..@todasConfiguracionesMR.length-1] 
				$("#itemRandomText1#{i}").val($("#allRandomText1").val())
				$("#itemRandomText2#{i}").val($("#allRandomText2").val())
				$("#itemRandomText#{i}").val($("#allRandomText").val())

		$("#resetAllRandom").click =>
			for i in [0..@todasConfiguracionesMR.length-1] 
				$("#itemRandomText1#{i}").val(0)
				$("#itemRandomText2#{i}").val(0)
				$("#itemRandomText#{i}").val(1000)

		for i in [0..@todasConfiguracionesMR.length-1] 

			if i == parseInt($('#abrirMR1').val())
				poner = parseInt(@todasConfiguracionesMR[i][2])
				#console.log poner 
				#!important!
				$("#tiempoGo").html(poner)

	#dibujar y configurar MR
	configurarMR : () ->
		#console.clear()
		
		@tipoMR = parseInt($("#tipoMR").val())
		@digitosMR = parseInt($("#digitosMR").val())

		#3,6,9,12,15,18,21,24,27,30
		emptyColumsDec = [2,4,6,8,10,12,14,16,18,20]
		emptyColumBin = [3,6,9,12,15,18]
		emptyColumsLetters = [2,4,7,12,13,16,19,22,25,28]
		emptyColumBin8 = [4,7,10,13,16,19]

		possible = "abcdefghijklmnopqrstuvwxyz"
		txt = possible.charAt( _.random(0,possible.length-1) )

		possible1 = "0123456789"
		possible2 = "101010"
		possible3 = "010101"
		possible4 = "10101010"
		possible5 = "01011010"

		maxColumnsDec = 22
		maxColumnsBin = 21	
		maxColumnsBin8 = 23
		maxColumnsLetters = 22	

		iSpace = 30
		jSpace = 30
	
		imprimir = ""	

		inicioCuadro = $(".wrapper").position()
		inicioCuadro = inicioCuadro.top 

		#dec

		if @tipoMR == 0
			emptyColumns = emptyColumsDec
			ponerPossible = possible1
			finL = 10

		#bin6
		if @tipoMR == 1 
			emptyColumns = emptyColumBin
			ponerPossible = possible2
			finL = 5

		#bin8
		if @tipoMR == 3 
			emptyColumns = emptyColumBin8
			ponerPossible = possible4
			finL = 7

		#letter

		if @tipoMR == 2 
			emptyColumns = emptyColumsDec
			ponerPossible = possible
			finL = 26
		
		l = 0

		#Letras o números
		if @tipoMR == 0 or @tipoMR == 2
			k = 0
			
			for i in [0..20] 
				auxSuma = 0
				for j in [0..19]

					if l == finL
						l = 0

					if k < @digitosMR	

						if not (@matrizMRConfiguracion[k]?)

							@matrizMRConfiguracion[k] = []	
							@matrizMRConfiguracion[k][4] = 0
							@matrizMRConfiguracion[k][5] = 0	
						else 	

							@matrizMRConfiguracion[k][4] = 1 	#siguiente
							@matrizMRConfiguracion[k][5] = 1	#espacio


						if _.find(emptyColumns, (num) => num == j)
							auxSuma += jSpace

						myX = 20+j*jSpace+auxSuma
						myY = inicioCuadro+i*iSpace
						
						#Si tiene configurado cual va a ser el siguiente
						if parseInt(@matrizMRConfiguracion[k][4]) == 1 
							@matrizMRConfiguracion[k][2] 
							
						else
							@matrizMRConfiguracion[k][2] = k + 1
							@matrizMRConfiguracion[k][4] = 0 


						#si esta configurada una ubicacion especial

						if parseInt(@matrizMRConfiguracion[k][5]) == 1
							
							myX = @matrizMRConfiguracion[k][0] 
							myY = @matrizMRConfiguracion[k][1]  

						else
							@matrizMRConfiguracion[k][3] = 0 
							@matrizMRConfiguracion[k][0] = myX
							@matrizMRConfiguracion[k][1] = myY

						if @matrizSeleccionMR.length == 0
							@matrizMRConfiguracion[k][6] = 0

						poneleColor = "color: rgb(0, 0, 0);"
						if @matrizMRConfiguracion[k][6] == 1
							poneleColor = "color: rgb(160, 160, 160);"

						imprimir += """
							<div class="element colorElement" id="myElement#{k}"  style="#{poneleColor} margin-left: #{myX}px; top: #{myY}px; font-size: 40px;"> 					
									<b title="#{k}"> #{ ponerPossible.charAt( l )}  </b>
							</div>	
							<script>
								$("#myElement#{k}").click(function(){
									if(window.juegoReaction.matrizMRConfiguracion[#{k}][6]==1){
										$("#myElement#{k}").css("color","rgb(0, 0, 0)"); 
										window.juegoReaction.matrizMRConfiguracion[#{k}][6]=0;

									}else{
										$("#myElement#{k}").css("color","rgb(160, 160, 160)"); 
										window.juegoReaction.matrizMRConfiguracion[#{k}][6]=1;
									}
								});

							</script>
							"""
						k++; l++;
						
					else
						break

				if k > @digitosMR
					break
		#console.log(@matrizMRConfiguracion)

		#binarios

		if @tipoMR == 1 or @tipoMR == 3 
			k = 0 #indice digitos

			fPossible = 1
		
			mResta = 1
			ii = 0
			jj = 0

			especial = 0


			for i in [0..4] 

				auxSuma = 0
				mResta = 1
				jj = 0
				fModif = 1

				if @tipoMR == 1
					limitColums = 41
				else
					limitColums = 47

				for j in [0..limitColums]

					if k < @digitosMR

						if not (@matrizMRConfiguracion[k]?)

							@matrizMRConfiguracion[k] = []	
							@matrizMRConfiguracion[k][4] = 0
							@matrizMRConfiguracion[k][5] = 0	
						else 	

							@matrizMRConfiguracion[k][4] = 1
							@matrizMRConfiguracion[k][5] = 1						

						if @tipoMR == 1

							if k % 6 == 0 	
								l = 0
							
								if fPossible 
									ponerPossible = possible2
									fPossible = 0
								else 
									ponerPossible = possible3
									fPossible = 1
														
								if j != 0

									auxSuma += jSpace
						else
							if k % 8 == 0 	

								l = 0
								
								if fPossible 
									ponerPossible = possible4
									fPossible = 0
								else 
									ponerPossible = possible5
									fPossible = 1
														
								if j != 0

									auxSuma += jSpace

						if @tipoMR == 1

							if k % 3 == 0 and j != 0

								if fModif 

									fModif = 0
									ii++
									jj -= 3


								else
									fModif = 1
									ii--	
						else 
							if k % 4 == 0 and j != 0

								if fModif 

									fModif = 0
									ii++
									jj -= 4


								else
									fModif = 1
									ii--	

						myX = 20+jj*jSpace+auxSuma
						myY = inicioCuadro+ii*iSpace

						# console.log "myX = 20+jj*jSpace+auxSuma"
						# console.log "20+#{jj}*#{jSpace}+#{auxSuma}=#{myX}"	
						
							
						#Si tiene configurado cual va a ser el siguiente
						if parseInt(@matrizMRConfiguracion[k][4]) == 1 
							@matrizMRConfiguracion[k][2] 
							
						else
							@matrizMRConfiguracion[k][2] = k + 1
							@matrizMRConfiguracion[k][4] = 0 


						#si esta configurada una ubicacion especial
						if parseInt(@matrizMRConfiguracion[k][5]) == 1
							
							myX = @matrizMRConfiguracion[k][0] 
							myY = @matrizMRConfiguracion[k][1]  

						else
							
							@matrizMRConfiguracion[k][3] = 0 
							@matrizMRConfiguracion[k][0] = myX
							@matrizMRConfiguracion[k][1] = myY							

						
						#console.log("k:" + k + "|ii:" + ii + "|jj:" + jj + "|x:" + myX + "|y:" + myY + "|mr3:" + @matrizMRConfiguracion[k][3] + "|auxSuma:" + auxSuma)

						
						#debugger
						if @matrizSeleccionMR.length == 0
							@matrizMRConfiguracion[k][6] = 0

						poneleColor = "color: rgb(0, 0, 0);"
						if @matrizMRConfiguracion[k][6] == 1
							poneleColor = "color: rgb(160, 160, 160);"

						imprimir += """
							<div class="element" id="myElement#{k}"  style="#{poneleColor} margin-left: #{myX}px; top: #{myY}px; font-size: 40px;"> 
								<b title="#{k}">#{ ponerPossible.charAt( l )}</b>
							</div>	
							<script>
								$("#myElement#{k}").click(function(){
									if(window.juegoReaction.matrizMRConfiguracion[#{k}][6]==1){
										$("#myElement#{k}").css("color","rgb(0, 0, 0)"); 
										window.juegoReaction.matrizMRConfiguracion[#{k}][6]=0;

									}else{
										$("#myElement#{k}").css("color","rgb(160, 160, 160)"); 
										window.juegoReaction.matrizMRConfiguracion[#{k}][6]=1;
									}
								});
							</script>
							"""
						$(".container").html(imprimir)

						k++; l++;

						
						jj++
						
					else
						break
				ii += 1

				if k > @digitosMR
					break
		###
		imprimir += """

			<script>
				$(".colorElement").click(function(){
					
					if( $(this).css("color") == "rgb(0, 0, 0)"){ 
						$(this).css("color","rgb(160, 160, 160)"); 
					}else{
						$(this).css("color","rgb(0, 0, 0)"); 

					}


				});
			</script>

		"""
		###

		$(".container").html(imprimir)

		for x in [0..@matrizMRConfiguracion.length-1] 
			$("myElement#{x}").unbind('click');

			eval (""" 
				$("#myElement#{x}").click(function() {

					fPoner = 1;
					sacar = [];

					for(j=0;j<window.juegoReaction.matrizSeleccionMR.length;j++){
						if (window.juegoReaction.matrizSeleccionMR[j] == #{x}){
							fPoner = 0;
							sacar[0] = #{x};

							window.juegoReaction.matrizSeleccionMR = _.difference(window.juegoReaction.matrizSeleccionMR, sacar) ;
						}
						
					}
				
					if (fPoner){

						window.juegoReaction.matrizSeleccionMR = _.union(window.juegoReaction.matrizSeleccionMR, #{x});
						myVal = _.map(window.juegoReaction.matrizSeleccionMR, function(num){ return num; })
						
						$("#seleccionMR").val(myVal);
						
					}

					window.juegoReaction.matrizSeleccionMR = _.sortBy(window.juegoReaction.matrizSeleccionMR, function(num){ return num; });

					myVal = _.map(window.juegoReaction.matrizSeleccionMR, function(num){ return num; });
						
					$("#seleccionMR").val(myVal);

					if (window.juegoReaction.matrizSeleccionMR.length == 1){

						$("#siguienteMR").val(window.juegoReaction.matrizMRConfiguracion[#{x}][2]);
					}else{
						$("#siguienteMR").val("");

					}
				});
				""")

			
	checkboxAction : (accion,name,cantidad,yy) ->

		#all
		if accion == "all"

			for xx in [0..cantidad]
			
				$("##{name}#{xx}").prop('checked', true);

		#random
		if accion == "random"
			for xx in [0..cantidad]
				if _.random(0,1)
					$("##{name}#{xx}").prop('checked', true);
				else
					$("##{name}#{xx}").prop('checked', false);

		if accion == "quitar"

			for xx in [0..cantidad]
				if $("##{name}#{xx}").is(':checked') 
					$("##{name}#{xx}").prop('checked', false);

			$("##{name}#{yy}").prop('checked', true);

	cls : ->
		$("#screen").html("<h4>&nbsp;</h4>")
		
$(window).load ->
	window.juegoReaction = new motorReaction()
