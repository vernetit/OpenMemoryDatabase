(function() {
  var motorReaction;

  motorReaction = (function() {
    motorReaction.prototype.pasadas = 0;

    motorReaction.prototype.resultado = 0;

    motorReaction.prototype.killTimeout = 0;

    motorReaction.prototype.killTimeout3 = 0;

    motorReaction.prototype.tipo = 0;

    motorReaction.prototype.esMovil = 0;

    motorReaction.prototype.myZoom = "100%";

    motorReaction.prototype.mMR = [];

    motorReaction.prototype.mCurrentMR = [];

    motorReaction.prototype.ejerciciosMR = [];

    motorReaction.prototype.seleccionMR = "";

    motorReaction.prototype.matrizSeleccionMR = [];

    motorReaction.prototype.matrizMRConfiguracion = [];

    motorReaction.prototype.todasConfiguracionesMR = [];

    motorReaction.prototype.digitosMR = 0;

    motorReaction.prototype.tipoMR = 0;

    motorReaction.prototype.espacioMR = 0;

    motorReaction.prototype.ejerciciosMR = [];

    motorReaction.prototype.primeraMR = 0;

    motorReaction.prototype.selectedMRAccion = 0;

    motorReaction.prototype.tipoMRGo = 0;

    motorReaction.prototype.tiempoMRGo = 0;

    motorReaction.prototype.digitosMRGo = 0;

    motorReaction.prototype.matrizMRConfiguracionGo = [];

    motorReaction.prototype.resultadosMRGo = [];

    motorReaction.prototype.contadorMR = 0;

    motorReaction.prototype.arrayMRBin = [];

    motorReaction.prototype.bMRGo = 1;

    motorReaction.prototype.restaYMR = 0;

    motorReaction.prototype.widthGo = 0;

    motorReaction.prototype.disableCheck = 0;

    motorReaction.prototype.correccionMovilY = 0;

    motorReaction.prototype.mostrarValores = 0;

    motorReaction.prototype.topMovil = 0;

    motorReaction.prototype.arrayGoActivos = [];

    motorReaction.prototype.ch1 = 0;

    motorReaction.prototype.ch2 = 0;

    motorReaction.prototype.tAutoplay = 0;

    motorReaction.prototype.killAutoplay = 0;

    motorReaction.prototype.killAS = 0;

    motorReaction.prototype.killAS1 = 0;

    function motorReaction() {
      var isAndroid, isiPad, isiPhone, myHeight, myHeight1, myHeight2, myWidth, ua;
      $("#randomActive").click((function(_this) {
        return function() {
          if ($("#randomActive").is(':checked')) {
            $("#autoshow").prop('checked', false);
            $("#autoplay").prop('checked', false);
          }
          clearInterval(_this.killAutoplay);
          clearInterval(_this.killTimeout1);
          clearInterval(_this.killAS);
          return clearInterval(_this.killAS1);
        };
      })(this));
      $("#autoplay").click((function(_this) {
        return function() {
          if ($("#autoplay").is(':checked')) {
            return $("#randomActive").prop('checked', false);
          }
        };
      })(this));
      $("#autoshow").click((function(_this) {
        return function() {
          if ($("#autoshow").is(':checked')) {
            $("#randomActive").prop('checked', false);
            if ((parseInt($("#tiempoAutoshow").val()) + parseInt($("#tiempoAutoshow1").val())) * 1000 >= parseInt($("#tiempoAutoplay").val())) {
              return parseInt($("#tiempoAutoplay").val((parseInt($("#tiempoAutoshow").val()) + parseInt($("#tiempoAutoshow1").val())) * 1000 + 1000));
            }
          }
        };
      })(this));
      $("#logInOrSignUp").hide();
      $("#siguiente-span").hide();
      $("#delete-all-span").hide();
      $("#tamano-texto-td").hide();
      $("#zoom-span").hide();
      if (userId === 0) {
        ponerControlUsuarios();
      } else {
        ponerLogout(userName);
      }
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
      console.log(myWidth + "x" + myHeight);
      this.disableCheck = 1;
      $("#contadorMR").html(this.contadorMR);
      this.iniciarBin();
      this.selectedMRAccion = 0;
      this.iniciarMR();
      $('body').keyup((function(_this) {
        return function(e) {
          if (e.keyCode === 32) {
            _this.disableCheck = 0;
            clearInterval(_this.killAutoplay);
            clearInterval(_this.killTimeout1);
            clearInterval(_this.killAS);
            clearInterval(_this.killAS1);
            $("#contadorMR").html(_this.contadorMR);
            $("#div-help").hide();
            $("#div-configurar").hide();
            $("#controlesMR1").hide();
            _this.goMR(0);
          }
          if (e.keyCode === 13) {
            console.log(_this.mostrarValores);
            if (_this.mostrarValores) {
              _this.goMR(2);
              return;
            }
            if (_this.disableCheck) {
              return;
            }
            $("#div-help").hide();
            if ($("#fastMode").is(':checked')) {
              if ($("#screen").html() === "") {
                return _this.goMR(1);
              } else {
                return $("#screen").html("");
              }
            } else {
              _this.checkMR();
              return $("#controlesMR1").show();
            }
          }
        };
      })(this));
      $("#abrirMR1").change((function(_this) {
        return function() {
          var i, m, poner, ref, results;
          results = [];
          for (i = m = 0, ref = _this.todasConfiguracionesMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            if (i === parseInt($('#abrirMR1').val())) {
              poner = parseInt(_this.todasConfiguracionesMR[i][2]);
              console.log(poner);
              results.push($("#tiempoGo").html(poner));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this));
      $("#autoplay").click((function(_this) {
        return function() {
          _this.pasadas = 0;
          $("#pasadasTxt").html(_this.pasadas);
          clearInterval(_this.killAutoplay);
          clearInterval(_this.killTimeout1);
          clearInterval(_this.killAS);
          return clearInterval(_this.killAS1);
        };
      })(this));
      $("#pasadasTxt").click((function(_this) {
        return function() {
          _this.pasadas = 0;
          $("#pasadasTxt").html(_this.pasadas);
          if ($("#autoplay").is(':checked') || $("#randomActive").is(':checked')) {
            clearInterval(_this.killAutoplay);
            clearInterval(_this.killTimeout1);
            clearInterval(_this.killAS);
            return clearInterval(_this.killAS1);
          }
        };
      })(this));
      $("#guardarMRBin").click((function(_this) {
        return function() {
          var i, m, n, save, txt;
          for (i = m = 0; m <= 7; i = ++m) {
            txt = $("#binMR" + i).val();
            if (txt.length === 0) {
              alert("Debe completar todos los campos");
              return;
            }
          }
          save = "";
          for (i = n = 0; n <= 7; i = ++n) {
            txt = $("#binMR" + i).val();
            save += txt;
            save += "|";
          }
          save = save.substring(0, save.length - 1);
          localStorage.setItem("initBin", save);
          console.log(save);
          return _this.iniciarBin();
        };
      })(this));
      $("#contadorMR").click((function(_this) {
        return function() {
          _this.contadorMR = 0;
          return $("#contadorMR").html(_this.contadorMR);
        };
      })(this));
      $("#controlesMR1").hide();
      $("#nextMR").click((function(_this) {
        return function() {
          $("#controlesMR1").hide();
          $("#screen").html("");
          return _this.disableCheck = 1;
        };
      })(this));
      $('#verifyMR').msgbox({
        content: 'jqueryscript.net',
        padding: 12
      });
      $("#verifyMR").click((function(_this) {
        return function() {
          return _this.goMR(2);
        };
      })(this));
      $("#goMR").click((function(_this) {
        return function() {
          clearInterval(_this.killAutoplay);
          clearInterval(_this.killTimeout1);
          clearInterval(_this.killAS);
          clearInterval(_this.killAS1);
          _this.disableCheck = 0;
          $("#contadorMR").html(_this.contadorMR);
          $("#div-help").hide();
          $("#div-configurar").hide();
          $("#controlesMR1").hide();
          return _this.goMR(0);
        };
      })(this));
      $("#checkMR").click((function(_this) {
        return function() {
          if (_this.disableCheck) {
            return;
          }
          $("#div-help").hide();
          if ($("#fastMode").is(':checked')) {
            if ($("#screen").html() === "") {
              return _this.goMR(1);
            } else {
              return $("#screen").html("");
            }
          } else {
            _this.checkMR();
            return $("#controlesMR1").show();
          }
        };
      })(this));
      $('#abrirMR').change((function(_this) {
        return function() {
          _this.abrirMR();
          return _this.configurarMR();
        };
      })(this));
      $("#borrarMR").click((function(_this) {
        return function() {
          var arrayAux, auxTodasConfiguracionesMR, i, k, m, n, ref, ref1, save, select;
          if (_this.todasConfiguracionesMR.length === 1) {
            return;
          }
          select = parseInt($("#abrirMR").val());
          if (select === 0) {
            return;
          }
          save = "";
          auxTodasConfiguracionesMR = [];
          for (i = m = 0, ref = _this.todasConfiguracionesMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            if (i !== select) {
              save += _this.todasConfiguracionesMR[i][0] + "*" + _this.todasConfiguracionesMR[i][1] + "*" + _this.todasConfiguracionesMR[i][2] + "*" + _this.todasConfiguracionesMR[i][3] + "*";
              for (k = n = 0, ref1 = _this.todasConfiguracionesMR[i][4].length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; k = 0 <= ref1 ? ++n : --n) {
                arrayAux = [];
                arrayAux = _this.todasConfiguracionesMR[i][4][k];
                save += (parseInt(arrayAux[0])) + " " + (parseInt(arrayAux[1])) + " " + (parseInt(arrayAux[2]));
                save += "-";
              }
              save = save.substring(0, save.length - 1);
              save += "|";
            }
          }
          save = save.substring(0, save.length - 1);
          _this.todasConfiguracionesMR = [];
          _this.matrizMRConfiguracion = [];
          localStorage.setItem("initMR", save);
          $("#tiempoMR").val("500");
          $("#digitosMR").val("6");
          _this.selectedMRAccion = 0;
          return _this.iniciarMR();
        };
      })(this));
      $("#borrarTodoMR").click((function(_this) {
        return function() {
          if (_this.todasConfiguracionesMR.length === 1) {
            return;
          }
          if (confirm('Estás seguro que quieres borrar las configuraciones?')) {
            localStorage.removeItem('initMR');
            _this.todasConfiguracionesMR = [];
            _this.matrizMRConfiguracion = [];
            $("#tiempoMR").val("500");
            $("#digitosMR").val("6");
            $('#tipoMR option[value=0]').attr('selected', 'selected');
            return _this.iniciarMR();
          }
        };
      })(this));
      $('#guardarMR').click((function(_this) {
        return function() {
          var arrayAux, i, j, k, m, n, name, nombre, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, save, seleccionado, select;
          select = parseInt($("#abrirMR").val());
          save = "";
          seleccionado = 0;
          if (select === 0) {
            for (i = m = 0, ref = _this.todasConfiguracionesMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
              save += _this.todasConfiguracionesMR[i][0] + "*" + _this.todasConfiguracionesMR[i][1] + "*" + _this.todasConfiguracionesMR[i][2] + "*" + _this.todasConfiguracionesMR[i][3] + "*";
              for (k = n = 0, ref1 = _this.todasConfiguracionesMR[i][4].length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; k = 0 <= ref1 ? ++n : --n) {
                arrayAux = [];
                arrayAux = _this.todasConfiguracionesMR[i][4][k];
                save += (parseInt(arrayAux[0])) + " " + (parseInt(arrayAux[1])) + " " + (parseInt(arrayAux[2]));
                save += "-";
              }
              save = save.substring(0, save.length - 1);
              save += "|";
            }
            swal({
              title: 'Rapid Memory',
              imageUrl: '',
              text: 'Enter Name',
              type: 'input',
              showCancelButton: false,
              closeOnConfirm: true,
              animation: 'slide-from-top',
              inputValue: '',
              inputPlaceholder: ''
            }, function(inputValue) {
              var name, nombre, o, ref2;
              name = inputValue;
              nombre = name;
              if (nombre === "") {
                return;
              }
              save += nombre + "*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*";
              for (i = o = 0, ref2 = $("#digitosMR").val() - 1; 0 <= ref2 ? o <= ref2 : o >= ref2; i = 0 <= ref2 ? ++o : --o) {
                save += (parseInt(_this.matrizMRConfiguracion[i][0])) + " " + (parseInt(_this.matrizMRConfiguracion[i][1])) + " " + _this.matrizMRConfiguracion[i][2];
                save += "-";
              }
              save = save.substring(0, save.length - 1);
              seleccionado = _this.todasConfiguracionesMR.length;
              localStorage.setItem("initMR", save);
              _this.selectedMRAccion = seleccionado;
              _this.todasConfiguracionesMR = [];
              _this.matrizMRConfiguracion = [];
              _this.cargarMR();
              _this.abrirMR();
              return _this.configurarMR();
            });
            return;
            nombre = prompt("Enter name", "");
            if (name = "") {
              return;
            }
            save += nombre + "*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*";
            for (i = o = 0, ref2 = $("#digitosMR").val() - 1; 0 <= ref2 ? o <= ref2 : o >= ref2; i = 0 <= ref2 ? ++o : --o) {
              save += (parseInt(_this.matrizMRConfiguracion[i][0])) + " " + (parseInt(_this.matrizMRConfiguracion[i][1])) + " " + _this.matrizMRConfiguracion[i][2];
              save += "-";
            }
            save = save.substring(0, save.length - 1);
            seleccionado = _this.todasConfiguracionesMR.length;
          } else {
            seleccionado = select;
            for (i = p = 0, ref3 = _this.todasConfiguracionesMR.length - 1; 0 <= ref3 ? p <= ref3 : p >= ref3; i = 0 <= ref3 ? ++p : --p) {
              if (i === select) {
                save += _this.todasConfiguracionesMR[i][0] + "*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*";
                for (j = q = 0, ref4 = $("#digitosMR").val() - 1; 0 <= ref4 ? q <= ref4 : q >= ref4; j = 0 <= ref4 ? ++q : --q) {
                  save += (parseInt(_this.matrizMRConfiguracion[j][0])) + " " + (parseInt(_this.matrizMRConfiguracion[j][1])) + " " + _this.matrizMRConfiguracion[j][2];
                  save += "-";
                }
                save = save.substring(0, save.length - 1);
              } else {
                save += _this.todasConfiguracionesMR[i][0] + "*" + _this.todasConfiguracionesMR[i][1] + "*" + _this.todasConfiguracionesMR[i][2] + "*" + _this.todasConfiguracionesMR[i][3] + "*";
                for (k = r = 0, ref5 = _this.todasConfiguracionesMR[i][4].length - 1; 0 <= ref5 ? r <= ref5 : r >= ref5; k = 0 <= ref5 ? ++r : --r) {
                  arrayAux = [];
                  arrayAux = _this.todasConfiguracionesMR[i][4][k];
                  save += (parseInt(arrayAux[0])) + " " + (parseInt(arrayAux[1])) + " " + (parseInt(arrayAux[2]));
                  save += "-";
                }
                save = save.substring(0, save.length - 1);
              }
              save += "|";
            }
            save = save.substring(0, save.length - 1);
            localStorage.setItem("initMR", save);
            _this.selectedMRAccion = seleccionado;
            _this.todasConfiguracionesMR = [];
            _this.matrizMRConfiguracion = [];
            _this.cargarMR();
            _this.abrirMR();
            _this.configurarMR();
          }
          return;
          localStorage.setItem("initMR", save);
          _this.selectedMRAccion = seleccionado;
          _this.todasConfiguracionesMR = [];
          _this.matrizMRConfiguracion = [];
          _this.cargarMR();
          _this.abrirMR();
          return _this.configurarMR();
        };
      })(this));
      $('#unselectMR').click((function(_this) {
        return function() {
          _this.matrizSeleccionMR = [];
          $("#seleccionMR").val("");
          $("#siguienteMR").val("");
          return _this.configurarMR();
        };
      })(this));
      $('#addMR').click((function(_this) {
        return function() {
          var aux;
          aux = parseInt($("#movimientoMR").val());
          aux += 1;
          return $("#movimientoMR").val(aux);
        };
      })(this));
      $('#restMR').click((function(_this) {
        return function() {
          var aux;
          aux = parseInt($("#movimientoMR").val());
          if (aux !== 0) {
            aux -= 1;
          }
          return $("#movimientoMR").val(aux);
        };
      })(this));
      $('#addMR1').click((function(_this) {
        return function() {
          var aux;
          aux = parseInt($("#movimientoMR").val());
          aux += 10;
          return $("#movimientoMR").val(aux);
        };
      })(this));
      $('#restMR1').click((function(_this) {
        return function() {
          var aux;
          aux = parseInt($("#movimientoMR").val());
          if (aux - 10 > 0) {
            aux -= 10;
          }
          return $("#movimientoMR").val(aux);
        };
      })(this));
      $('#upMR').click((function(_this) {
        return function() {
          var aux, i, m, ref;
          aux = parseInt($("#movimientoMR").val());
          for (i = m = 0, ref = _this.matrizSeleccionMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][1] -= aux;
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][3] = 1;
          }
          return _this.configurarMR();
        };
      })(this));
      $('#downMR').click((function(_this) {
        return function() {
          var aux, i, m, ref;
          aux = parseInt($("#movimientoMR").val());
          for (i = m = 0, ref = _this.matrizSeleccionMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][1] += aux;
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][3] = 1;
          }
          return _this.configurarMR();
        };
      })(this));
      $('#leftMR').click((function(_this) {
        return function() {
          var aux, i, m, ref;
          aux = parseInt($("#movimientoMR").val());
          for (i = m = 0, ref = _this.matrizSeleccionMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][0] -= aux;
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][3] = 1;
          }
          return _this.configurarMR();
        };
      })(this));
      $('#rightMR').click((function(_this) {
        return function() {
          var aux, i, m, ref;
          aux = parseInt($("#movimientoMR").val());
          for (i = m = 0, ref = _this.matrizSeleccionMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][0] += aux;
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][3] = 1;
          }
          return _this.configurarMR();
        };
      })(this));
      $('#restaDigitosMR').click((function(_this) {
        return function() {
          var aux;
          aux = parseInt($("#digitosMR").val());
          aux -= 1;
          $("#digitosMR").val(aux);
          return _this.configurarMR();
        };
      })(this));
      $('#sumaDigitosMR').click((function(_this) {
        return function() {
          var aux;
          aux = parseInt($("#digitosMR").val());
          aux += 1;
          $("#digitosMR").val(aux);
          return _this.configurarMR();
        };
      })(this));
      $('#digitosMR').change((function(_this) {
        return function() {
          return _this.configurarMR();
        };
      })(this));
      $('#tipoMR').change((function(_this) {
        return function() {
          var ref;
          _this.matrizMRConfiguracion = [];
          _this.matrizSeleccionMR = [];
          if (parseInt($('#tipoMR').val()) === 3) {
            $('#digitosMR').val(8);
          }
          if ((ref = parseInt($('#tipoMR').val())) === 0 || ref === 1 || ref === 2) {
            $('#digitosMR').val(6);
          }
          $("#seleccionMR").val("");
          $("#siguienteMR").val("");
          return _this.configurarMR();
        };
      })(this));
      $('#siguienteMR').change((function(_this) {
        return function() {
          var aux, i, m, ref;
          aux = parseInt($("#siguienteMR").val());
          for (i = m = 0, ref = _this.matrizSeleccionMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][2] = aux;
            _this.matrizMRConfiguracion[_this.matrizSeleccionMR[i]][4] = 1;
          }
          return _this.configurarMR();
        };
      })(this));
      $("#footer").hide();
      $("#timer").hide();
      ua = navigator.userAgent.toLowerCase();
      isAndroid = 0;
      isiPad = 0;
      isiPhone = 0;
      isAndroid = ua.indexOf('android') > -1;
      isiPad = navigator.userAgent.match(/iPad/i) !== null;
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
        isiPhone = 1;
      }

      /*
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
       */

      /*
      		if window.screen.availWidth == 320 and isiPhone
      		
      			$("#controlesMR").css("zoom", "100%")
      			$("#footer").css("zoom", "105%")
      			$("#myContadorSpan").hide()
      			$("#myAutoShowSpan").hide()
      			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);
      
      			@correccionMovilY = 0
      
      			$("#screen").css("zoom", "100%")
       */

      /*
      		if window.screen.availWidth == 568 and isiPhone
      		
      			$("#controlesMR").css("zoom", "100%")
      			$("#footer").css("zoom", "102%")
      			$("#myContadorSpan").hide()
      			$("#myAutoShowSpan").hide()
      			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);
      
      			@correccionMovilY = 0
      
      			$("#screen").css("zoom", "100%")
       */

      /*
      		if window.screen.availWidth < 750 and window.screen.availWidth > 402
      			
      
      			$("#controlesMR").css("zoom", "180%")
      			$("#footer").css("zoom", "105%")
      			$("#myContadorSpan").hide()
      			$("#myAutoShowSpan").hide()
      			$("#myLimitSpan").hide(); $("#limitautoplay").prop('checked', false);
      
      			@correccionMovilY = 0
      
      			$("#screen").css("zoom", "150%")
       */
      if (window.screen.availWidth < 750 || isAndroid || isiPad || isiPhone) {
        $("#footer").show();
        $("#btn-z-id").css("font-size", "150%");
        $("#btn-x-id").css("font-size", "150%");
        $("#periY").val("5");
        $("#myOther").hide();
        this.esMovil = 1;
        if (isiPad) {
          $("#footer").css("zoom", "105%");
        }
        myHeight1 = $("#footer").height();
        if (window.screen.availWidth < 800) {
          $("#fb-btn").html("");
          $("#control-configurar-div").height("30px");
          $("#btn-z-id").height("50px");
          $("#btn-x-id").height("50px");
          $("#screen").css("zoom", "50%");
          window.isMovilSystem = this.esMovil;
          window.helpText = "Simulador de Memoria rápida Web Experimental\nSoftware oficial en http://www.speed-memory.com/ \ncfg: Aagregar configuraciones de números\nAutoplay dispara las pruebas automáticamente con un intervalo de milisegundos estipulado. Para hacer pausa desactive autoplay.  \nExiste un limite de configuraciones que se puede cargar, aprox: 200 números entre todas las configuraciones\nContacto: robertchalean@gmail.com";
          ponerControlUsuarios();
          $("#fast-mode-txt").html("FM");
          $("#boton-conf").prop('value', 'cfg');
          this.correccionMovilY = 80;
          this.topMovil = 1;
          $("#goMR").hide();
          $("#checkMR").hide();
          $("#myAutoShowSpan").hide();
          $("#myLimitSpan").hide();
          $("#select-td").hide();
          $("#delete-separator-span").hide();
          $("#myRandom").hide();
          $("#zoom-span").show();
          $("#zoomMR").change((function(_this) {
            return function() {
              var z;
              if (navigator.userAgent.match(/Windows Phone/i)) {
                z = 0;
                switch ($('#zoomMR').val()) {
                  case "25":
                    z = 0.25;
                    break;
                  case "50":
                    z = 0.5;
                    break;
                  case "75":
                    z = 0.75;
                    break;
                  case "100":
                    z = 0.75;
                    break;
                  case "150":
                    z = 1.5;
                    break;
                  case "175":
                    z = 1.75;
                    break;
                  case "200":
                    z = 2.00;
                    break;
                  case "225":
                    z = 2.2;
                }
                return $("#screen").css("transform", "scale(" + z + ")");
              } else {
                $("#screen").css("zoom", (parseInt($('#zoomMR').val())) + "%");
                return $(".container").css("zoom", (parseInt($('#zoomMR').val())) + "%");
              }
            };
          })(this));
          $("#select-span").html("<input type=\"button\" value=\"UnselectAll\" id=\"unselectMR2\">");
          $('#unselectMR2').click((function(_this) {
            return function() {
              _this.matrizSeleccionMR = [];
              $("#seleccionMR").val("");
              $("#siguienteMR").val("");
              return _this.configurarMR();
            };
          })(this));
          $("#tamano-texto-td").hide();
          $("#guardar-bin-td").hide();
          $("#bin-controls-td").hide();
          $("#open-span").hide();
          $("#digits-configuration-span").hide();
          myHeight1 = parseInt($("#footer").height()) + 20;
          $('#navegar').css({
            'zoom': '100%',
            'width': '100%'
          });
          myHeight2 = parseInt($("#footer").height());
          $('#control-config').css({
            'zoom': '125%',
            'rigth': '0px'
          });
          $("#control-config").css("position", "fixed");
          $("#control-config").css("bottom", myHeight2 + "px");
          $("#control-config").css("right", "0px");
          $("#numeros-configuracion-div").css("position", "fixed");
          $("#limitautoplay").prop('checked', false);

          /*
          				
          				$("#navegar").css({	
          					'position' : 'fixed',
          					'zoom' : '150%',
          					'#bottom' : '#{myHeight1}',
          					'margin-bottom' : '0px',
          					'width' : '100%'
          				});
           */
        }
      }
      if (window.screen.availWidth === 2560) {
        this.restaYMR = 0;
        this.myZoom = "400%";
      }
      $("#div-configurar").hide();
      $("#boton-guardar").click((function(_this) {
        return function() {
          return $("#div-configurar").hide();
        };
      })(this));
      $("#boton-conf").click((function(_this) {
        return function() {
          $("#screen").html("");
          $("#controlesMR1").hide();
          if ($("#div-configurar").is(':visible')) {
            return $("#div-configurar").hide();
          } else {
            return $("#div-configurar").show();
          }
        };
      })(this));
      $("#btn-z-id").click((function(_this) {
        return function() {
          if (_this.bMRGo) {
            $("#contadorMR").html(_this.contadorMR);
            $("#div-help").hide();
            $("#div-configurar").hide();
            return _this.goMR(0);
          } else {
            return _this.checkPosicion(true);
          }
        };
      })(this));
      $("#btn-x-id").click((function(_this) {
        return function() {
          if (_this.bMRGo) {
            $("#div-help").hide();
            if ($("#fastMode").is(':checked')) {
              return _this.goMR(1);
            } else {
              _this.checkMR();
              return $("#controlesMR1").show();
            }
          } else {
            return _this.checkPosicion(false);
          }
        };
      })(this));
      document.body.style.zoom = this.myZoom;
    }

    motorReaction.prototype.iniciarBin = function() {
      var arrayBase, arrayBase1, i, j, k, m, myCookie, ref, results, save, str, txt;
      myCookie = localStorage.getItem("initBin");
      if (!(myCookie != null)) {
        save = "r|t d|f|n|c k|l|s z|m";
        localStorage.setItem("initBin", save);
        this.iniciarBin();
        return;
      }
      k = 0;
      arrayBase = [];
      arrayBase1 = [];
      arrayBase = myCookie.split("|");
      results = [];
      for (i = m = 0, ref = arrayBase.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        this.arrayMRBin[i] = [];
        txt = arrayBase[i];
        arrayBase1 = txt.split(" ");
        $("#binMR" + i).val(txt);
        results.push((function() {
          var n, ref1, results1;
          results1 = [];
          for (j = n = 0, ref1 = arrayBase1.length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; j = 0 <= ref1 ? ++n : --n) {
            str = arrayBase1[j] + " ";
            results1.push(this.arrayMRBin[i][j] = str.charCodeAt(0));
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    motorReaction.prototype.checkMR = function() {
      var auxSuma, auxTxt, color, emptyColumBin, emptyColumns, emptyColumsDec, emptyColumsLetters, fModif, fPossible, finL, i, iSpace, ii, imprimir, inicioCuadro, j, jSpace, jj, k, l, m, mResta, maxColumnsBin, maxColumnsDec, maxColumnsLetters, myX, myY, n, o, p, poner, ponerPossible, possible, possible1, possible2, possible3, q, ref, txt;
      this.mostrarValores = 1;
      this.disableCheck = 1;
      for (i = m = 0, ref = this.digitosMRGo - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        if (this.tipoMRGo === 2) {
          this.resultadosMRGo[i] = $("#respuestaMRId" + i).val();
        } else {
          this.resultadosMRGo[i] = parseInt($("#respuestaMRId" + i).val());
        }
      }
      emptyColumsDec = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
      emptyColumBin = [3, 6, 9, 12, 15, 18];
      emptyColumsLetters = [2, 4, 7, 12, 13, 16, 19, 22, 25, 28];
      possible = "abcdefghijklmnopqrstuvwxyz";
      txt = possible.charAt(_.random(0, possible.length - 1));
      possible1 = "0123456789";
      possible2 = "101010";
      possible3 = "010101";
      maxColumnsDec = 22;
      maxColumnsBin = 21;
      maxColumnsLetters = 22;
      iSpace = 30;
      jSpace = 30;
      imprimir = "";
      inicioCuadro = $("#screen").position();
      inicioCuadro = inicioCuadro.top;
      if (this.tipoMRGo === 0) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible1;
        finL = 10;
      }
      if (this.tipoMRGo === 1) {
        emptyColumns = emptyColumBin;
        ponerPossible = possible2;
        finL = 5;
      }
      if (this.tipoMRGo === 2) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible;
        finL = 26;
      }
      l = 0;
      if (this.tipoMRGo === 0 || this.tipoMRGo === 2) {
        k = 0;
        for (i = n = 0; n <= 20; i = ++n) {
          auxSuma = 0;
          for (j = o = 0; o <= 19; j = ++o) {
            if (l === finL) {
              l = 0;
            }
            if (k < this.digitosMRGo) {
              if (!(this.matrizMRConfiguracionGo[k] != null)) {
                this.matrizMRConfiguracionGo[k] = [];
              }
              if (_.find(emptyColumns, (function(_this) {
                return function(num) {
                  return num === j;
                };
              })(this))) {
                auxSuma += jSpace;
              }
              myX = 20 + j * jSpace + auxSuma;
              myY = inicioCuadro + i * iSpace;
              if (parseInt(this.matrizMRConfiguracionGo[k][4]) === 1) {
                this.matrizMRConfiguracionGo[k][2];
              } else {
                this.matrizMRConfiguracionGo[k][2] = k + 1;
                this.matrizMRConfiguracionGo[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracionGo[k][3]) === 1) {
                myX = this.matrizMRConfiguracionGo[k][0];
                myY = this.matrizMRConfiguracionGo[k][1];
              } else {
                this.matrizMRConfiguracionGo[k][3] = 0;
                this.matrizMRConfiguracionGo[k][0] = myX;
                this.matrizMRConfiguracionGo[k][1] = myY;
              }
              color = "red";
              poner = this.resultadosMRGo[k];
              if (isNaN(this.resultadosMRGo[k])) {
                poner = "-";
              } else {
                if (parseInt(this.matrizMRConfiguracionGo[k][5]) === parseInt(this.resultadosMRGo[k])) {
                  color = "green";
                }
              }
              if (this.tipoMRGo === 2) {
                auxTxt = this.resultadosMRGo[k];
                if (auxTxt.length === 0) {
                  poner = "-";
                } else {
                  poner = this.resultadosMRGo[k];
                }
                if (this.matrizMRConfiguracionGo[k][5] === this.resultadosMRGo[k]) {
                  color = "green";
                }
              }
              imprimir += "<div class=\"element\" id=\"myElementGo" + k + "\"  style=\"margin-left: " + myX + "px; top: " + (myY - (100 + this.restaYMR - this.correccionMovilY)) + "px; font-size: 40px;\"> 					\n		<b> <font color=\"" + color + "\">" + poner + "  </font> </b>\n</div>	";
              k++;
              l++;
            } else {
              break;
            }
          }
          if (k > this.digitosMRGo) {
            break;
          }
        }
      }
      if (this.tipoMRGo === 1 || this.tipoMRGo === 3) {
        k = 0;
        fPossible = 1;
        mResta = 1;
        ii = 0;
        jj = 0;
        for (i = p = 0; p <= 4; i = ++p) {
          auxSuma = 0;
          mResta = 1;
          jj = 0;
          fModif = 1;
          for (j = q = 0; q <= 41; j = ++q) {
            if (k < this.digitosMRGo) {
              if (!(this.matrizMRConfiguracionGo[k] != null)) {
                this.matrizMRConfiguracionGo[k] = [];
              }
              if (k % 6 === 0) {
                l = 0;
                if (fPossible) {
                  ponerPossible = possible2;
                  fPossible = 0;
                } else {
                  ponerPossible = possible3;
                  fPossible = 1;
                }
                if (j !== 0) {
                  auxSuma += jSpace;
                }
              }
              if (k % 3 === 0 && j !== 0) {
                if (fModif) {
                  fModif = 0;
                  ii++;
                  jj -= 3;
                } else {
                  fModif = 1;
                  ii--;
                }
              }
              myX = 20 + jj * jSpace + auxSuma;
              myY = inicioCuadro + ii * iSpace;
              if (parseInt(this.matrizMRConfiguracionGo[k][4]) === 1) {
                this.matrizMRConfiguracionGo[k][2];
              } else {
                this.matrizMRConfiguracionGo[k][2] = k + 1;
                this.matrizMRConfiguracionGo[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracionGo[k][3]) === 1) {
                myX = this.matrizMRConfiguracionGo[k][0];
                myY = this.matrizMRConfiguracionGo[k][1];
              } else {
                this.matrizMRConfiguracionGo[k][3] = 0;
                this.matrizMRConfiguracionGo[k][0] = myX;
                this.matrizMRConfiguracionGo[k][1] = myY;
              }
              color = "red";
              poner = this.resultadosMRGo[k];
              if (isNaN(this.resultadosMRGo[k])) {
                poner = "-";
              } else {
                if (parseInt(this.matrizMRConfiguracionGo[k][5]) === this.resultadosMRGo[k]) {
                  color = "green";
                }
              }
              imprimir += "<div class=\"element\" id=\"myElementGo" + k + "\"  style=\"margin-left: " + myX + "px; top: " + (myY - (100 + this.restaYMR - this.correccionMovilY)) + "px; font-size: 40px;\"> 					\n		<b> <font color=\"" + color + "\">" + poner + "  </font> </b>\n</div>	";
              k++;
              l++;
              jj++;
            } else {
              break;
            }
          }
          ii += 1;
          if (k > this.digitosMRGo) {
            break;
          }
        }
      }
      return $("#screen").html(imprimir);
    };

    motorReaction.prototype.respuestaMR = function() {
      var anterior, auxSuma, emptyColumBin, emptyColumns, emptyColumsDec, emptyColumsLetters, fModif, fPossible, finL, i, iSpace, ii, imprimir, inicioCuadro, j, jSpace, jj, k, l, m, mResta, maxColumnsBin, maxColumnsDec, maxColumnsLetters, myX, myY, n, o, p, ponerPossible, possible, possible1, possible2, possible3, q, ref, results, siguiente, siguiente2, txt, x;
      emptyColumsDec = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
      emptyColumBin = [3, 6, 9, 12, 15, 18];
      emptyColumsLetters = [2, 4, 7, 12, 13, 16, 19, 22, 25, 28];
      possible = "abcdefghijklmnopqrstuvwxyz";
      txt = possible.charAt(_.random(0, possible.length - 1));
      possible1 = "0123456789";
      possible2 = "101010";
      possible3 = "010101";
      maxColumnsDec = 22;
      maxColumnsBin = 21;
      maxColumnsLetters = 22;
      iSpace = 30;
      jSpace = 30;
      imprimir = "";
      inicioCuadro = $("#screen").position();
      inicioCuadro = inicioCuadro.top;
      if (this.tipoMRGo === 0) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible1;
        finL = 10;
      }
      if (this.tipoMRGo === 1) {
        emptyColumns = emptyColumBin;
        ponerPossible = possible2;
        finL = 5;
      }
      if (this.tipoMRGo === 2) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible;
        finL = 26;
      }
      l = 0;
      if (this.tipoMRGo === 0 || this.tipoMRGo === 2) {
        k = 0;
        for (i = m = 0; m <= 20; i = ++m) {
          auxSuma = 0;
          for (j = n = 0; n <= 19; j = ++n) {
            if (l === finL) {
              l = 0;
            }
            if (k < this.digitosMRGo) {
              if (!(this.matrizMRConfiguracionGo[k] != null)) {
                this.matrizMRConfiguracionGo[k] = [];
              }
              if (_.find(emptyColumns, (function(_this) {
                return function(num) {
                  return num === j;
                };
              })(this))) {
                auxSuma += jSpace;
              }
              myX = 20 + j * jSpace + auxSuma;
              myY = inicioCuadro + i * iSpace;
              if (parseInt(this.matrizMRConfiguracionGo[k][4]) === 1) {
                this.matrizMRConfiguracionGo[k][2];
              } else {
                this.matrizMRConfiguracionGo[k][2] = k + 1;
                this.matrizMRConfiguracionGo[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracionGo[k][3]) === 1) {
                myX = this.matrizMRConfiguracionGo[k][0];
                myY = this.matrizMRConfiguracionGo[k][1];
              } else {
                this.matrizMRConfiguracionGo[k][3] = 0;
                this.matrizMRConfiguracionGo[k][0] = myX;
                this.matrizMRConfiguracionGo[k][1] = myY;
              }
              imprimir += "<div class=\"element\" id=\"myElementGo" + k + "\"  style=\"margin-left: " + myX + "px; top: " + (myY - (95 + this.restaYMR - this.correccionMovilY)) + "px;\"> 					\n		<input type=\"text\" name=\"respuestaMR" + k + "\" value=\"\" style=\"width: " + (this.widthGo + 10) + "px; font-size: 20px;\" id=\"respuestaMRId" + k + "\" maxlength=\"1\">\n</div>	";
              k++;
              l++;
            } else {
              break;
            }
          }
          if (k > this.digitosMRGo) {
            break;
          }
        }
      }
      if (this.tipoMRGo === 1 || this.tipoMRGo === 3) {
        k = 0;
        fPossible = 1;
        mResta = 1;
        ii = 0;
        jj = 0;
        for (i = o = 0; o <= 4; i = ++o) {
          auxSuma = 0;
          mResta = 1;
          jj = 0;
          fModif = 1;
          for (j = p = 0; p <= 41; j = ++p) {
            if (k < this.digitosMRGo) {
              if (!(this.matrizMRConfiguracionGo[k] != null)) {
                this.matrizMRConfiguracionGo[k] = [];
              }
              if (k % 6 === 0) {
                l = 0;
                if (fPossible) {
                  ponerPossible = possible2;
                  fPossible = 0;
                } else {
                  ponerPossible = possible3;
                  fPossible = 1;
                }
                if (j !== 0) {
                  auxSuma += jSpace;
                }
              }
              if (k % 3 === 0 && j !== 0) {
                if (fModif) {
                  fModif = 0;
                  ii++;
                  jj -= 3;
                } else {
                  fModif = 1;
                  ii--;
                }
              }
              myX = 20 + jj * jSpace + auxSuma;
              myY = inicioCuadro + ii * iSpace;
              if (parseInt(this.matrizMRConfiguracionGo[k][4]) === 1) {
                this.matrizMRConfiguracionGo[k][2];
              } else {
                this.matrizMRConfiguracionGo[k][2] = k + 1;
                this.matrizMRConfiguracionGo[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracionGo[k][3]) === 1) {
                myX = this.matrizMRConfiguracionGo[k][0];
                myY = this.matrizMRConfiguracionGo[k][1];
              } else {
                this.matrizMRConfiguracionGo[k][3] = 0;
                this.matrizMRConfiguracionGo[k][0] = myX;
                this.matrizMRConfiguracionGo[k][1] = myY;
              }
              imprimir += "<div class=\"element\" id=\"myElementGo" + k + "\"  style=\"margin-left: " + myX + "px; top: " + (myY - (95 + this.restaYMR - this.correccionMovilY)) + "px;\"> \n	<input type=\"text\" name=\"respuestaMR{k}\" value=\"\"  style=\"width: " + (this.widthGo + 10) + "px; font-size: 20px;\" id=\"respuestaMRId" + k + "\" maxlength=\"1\">\n</div>	";
              k++;
              l++;
              jj++;
            } else {
              break;
            }
          }
          ii += 1;
          if (k > this.digitosMRGo) {
            break;
          }
        }
      }
      $("#screen").html(imprimir);
      $("#respuestaMRId0").focus();
      results = [];
      for (x = q = 0, ref = this.digitosMRGo - 1; 0 <= ref ? q <= ref : q >= ref; x = 0 <= ref ? ++q : --q) {
        siguiente = this.matrizMRConfiguracionGo[x][2];
        siguiente2 = siguiente;
        if (x === 0) {
          anterior = this.matrizMRConfiguracionGo[this.digitosMRGo - 2][2];
        } else {
          if (x === 1) {
            anterior = 0;
          } else {
            anterior = this.matrizMRConfiguracionGo[x - 2][2];
          }
        }
        if (x === this.digitosMRGo - 1) {
          siguiente2 = 0;
        }
        results.push(eval("\n//$(\"#respuestaMRId" + x + "\").focus(function() { $(this).select() });\n\n/*\n$(\"#respuestaMRId" + x + "\").focus(function() { \n	\n	if($(\"#respuestaMRId" + x + "\").val()!=\"\"){\n		setTimeout(function() {$(\"#respuestaMRId" + x + "\").select(); }, 0);\n\n	} \n\n	\n	\n\n});*/\n\n$(\"#respuestaMRId" + x + "\").keydown(function(e) {\n	\n	if (parseInt(e.which)==39){\n		$(\"#respuestaMRId" + siguiente2 + "\").focus();\n		setTimeout(function() {$(\"#respuestaMRId" + siguiente2 + "\").select();}, 5);\n\n	}\n	if (parseInt(e.which)==37){\n		$(\"#respuestaMRId" + anterior + "\").focus();\n		setTimeout(function() {$(\"#respuestaMRId" + anterior + "\").select();}, 5);\n\n	}\n\n});\n\n$(\"#respuestaMRId" + x + "\").keypress(function(event) {\n\n	if((" + x + " == " + (this.digitosMRGo - 1) + ") && (parseInt(event.which)!=13) ){\n		$(\"#respuestaMRId" + x + "\").val(\"\");\n\n	}\n\n\n	binTxt = [\"000\", \"001\", \"010\", \"011\", \"100\", \"101\", \"110\", \"111\"]; \n	\n	if (window.juegoReaction.tipoMRGo == 1) {\n\n		for(i=0;i<8;i++){\n\n			for(j=0;j<window.juegoReaction.arrayMRBin[i].length;j++){\n\n				//console.log(window.juegoReaction.arrayMRBin[i][j]);\n\n				if (parseInt(event.which) == parseInt(window.juegoReaction.arrayMRBin[i][j])){\n\n					str = binTxt[i];\n\n		  							$(\"#respuestaMRId" + (x + 3) + "\").focus();\n\n		  							setTimeout(function(){\n\n					$(\"#respuestaMRId" + x + "\").val(str.charAt(0));\n		  							$(\"#respuestaMRId" + (x + 1) + "\").val(str.charAt(1));\n		  							$(\"#respuestaMRId" + (x + 2) + "\").val(str.charAt(2));\n\n\n\n		  							},5);\n	  							\n	  								return;\n\n\n				}\n\n			}\n\n		}\n\n	}\n		setTimeout(function() {$(\"#respuestaMRId" + siguiente + "\").select();}, 5);\n		setTimeout(function() {$(\"#respuestaMRId" + siguiente + "\").focus();}, 6);\n\n	\n});\n$(\"#respuestaMRId" + x + "\").click(function(e) {\n\n	setTimeout(function() {$(\"#respuestaMRId" + x + "\").select(); }, 5);\n\n});"));
      }
      return results;
    };

    motorReaction.prototype.goMR = function(accion) {
      var arrayAux, auxSuma, emptyColumBin, emptyColumns, emptyColumsDec, emptyColumsLetters, fModif, fPossible, finL, i, iSpace, ii, imprimir, imprimir2, inicioCuadro, j, jSpace, jj, k, killTimeout1, kk, l, m, mResta, maxColumnsBin, maxColumnsDec, maxColumnsLetters, menosY, myDivIdContent, myPosition, myX, myY, n, o, p, poner, ponerPossible, possible, possible1, possible2, q, r, ref, ref1, ref2, s, selectedItem, txt;
      selectedItem = 0;
      if (accion === 0) {
        kk = 0;
        if ($("#randomActive").is(':checked')) {
          for (i = m = 0, ref = this.todasConfiguracionesMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            if ($("#itemRandom" + i).is(':checked')) {
              this.arrayGoActivos[kk] = i;
              kk++;
            }
          }
          selectedItem = this.arrayGoActivos[_.random(0, this.arrayGoActivos.length - 1)];
          $('#abrirMR1').val(selectedItem);
          this.ch1 = parseInt($("#itemRandomText1" + selectedItem).val());
          this.ch2 = parseInt($("#itemRandomText2" + selectedItem).val());
          this.tAutoplay = parseInt($("#itemRandomText" + selectedItem).val());
          poner = parseInt(this.todasConfiguracionesMR[selectedItem][2]);
          $("#tiempoGo").html(poner);
        } else {
          this.ch1 = parseInt($('#tiempoAutoshow').val());
          this.ch2 = parseInt($('#tiempoAutoshow1').val());
          this.tAutoplay = parseInt($('#tiempoAutoplay').val());
        }
      }
      console.log("item:" + selectedItem + " ch1:" + this.ch1 + " ch2:" + this.ch2 + " tAutoplay:" + this.tAutoplay);
      this.contadorMR++;
      $("#contadorMR").html(this.contadorMR);
      if (($("#autoplay").is(':checked') || $("#randomActive").is(':checked')) && $("#limitautoplay").is(':checked')) {
        this.pasadas++;
        $("#pasadasTxt").html(this.pasadas);
      }
      emptyColumsDec = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
      emptyColumBin = [3, 6, 9, 12, 15, 18];
      emptyColumsLetters = [2, 4, 7, 12, 13, 16, 19, 22, 25, 28];
      possible = "abcdefghijklmnopqrstuvwxyz";
      possible1 = "0123456789";
      possible2 = "10";
      maxColumnsDec = 22;
      maxColumnsBin = 21;
      maxColumnsLetters = 22;
      iSpace = 30;
      jSpace = 30;
      imprimir = "";
      imprimir2 = "";
      inicioCuadro = $("#screen").position();
      inicioCuadro = inicioCuadro.top;
      this.selectedMRAccion = parseInt($('#abrirMR1').val());
      k = 0;
      for (i = n = 0, ref1 = this.todasConfiguracionesMR.length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; i = 0 <= ref1 ? ++n : --n) {
        if (i === parseInt($('#abrirMR1').val())) {
          this.tipoMRGo = parseInt(this.todasConfiguracionesMR[i][1]);
          this.tiempoMRGo = parseInt(this.todasConfiguracionesMR[i][2]);
          this.digitosMRGo = parseInt(this.todasConfiguracionesMR[i][3]);
          if (this.tipoMRGo === 0) {
            ponerPossible = possible1;
          }
          if (this.tipoMRGo === 1) {
            ponerPossible = possible2;
          }
          if (this.tipoMRGo === 2) {
            ponerPossible = possible;
          }
          if (this.tipoMRGo === 3) {
            ponerPossible = possible2;
          }
          for (j = o = 0, ref2 = this.todasConfiguracionesMR[i][4].length - 1; 0 <= ref2 ? o <= ref2 : o >= ref2; j = 0 <= ref2 ? ++o : --o) {
            if (!accion) {
              this.matrizMRConfiguracionGo[k] = [];
            }
            arrayAux = [];
            arrayAux = this.todasConfiguracionesMR[i][4][j];
            this.matrizMRConfiguracionGo[k][0] = parseInt(arrayAux[0]);
            this.matrizMRConfiguracionGo[k][1] = parseInt(arrayAux[1]);
            this.matrizMRConfiguracionGo[k][2] = parseInt(arrayAux[2]);
            this.matrizMRConfiguracionGo[k][3] = 1;
            this.matrizMRConfiguracionGo[k][4] = 1;
            if (accion === 1 || accion === 2) {
              txt = this.matrizMRConfiguracionGo[k][5];
            } else {
              txt = ponerPossible.charAt(_.random(0, ponerPossible.length - 1));
            }
            this.matrizMRConfiguracionGo[k][5] = txt;
            k++;
          }
          break;
        }
      }
      if (this.tipoMRGo === 0) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible1;
        finL = 10;
      }
      if (this.tipoMRGo === 1) {
        emptyColumns = emptyColumBin;
        ponerPossible = possible2;
        finL = 5;
      }
      if (this.tipoMRGo === 2) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible;
        finL = 26;
      }
      l = 0;
      menosY = 100;
      if (accion === 2) {
        menosY = 250;
      }
      if (this.tipoMRGo === 0 || this.tipoMRGo === 2) {
        k = 0;
        for (i = p = 0; p <= 20; i = ++p) {
          auxSuma = 0;
          for (j = q = 0; q <= 19; j = ++q) {
            if (l === finL) {
              l = 0;
            }
            if (k < this.digitosMRGo) {
              if (!(this.matrizMRConfiguracionGo[k] != null)) {
                this.matrizMRConfiguracionGo[k] = [];
              }
              if (_.find(emptyColumns, (function(_this) {
                return function(num) {
                  return num === j;
                };
              })(this))) {
                auxSuma += jSpace;
              }
              myX = 20 + j * jSpace + auxSuma;
              myY = inicioCuadro + i * iSpace;
              if (parseInt(this.matrizMRConfiguracionGo[k][4]) === 1) {
                this.matrizMRConfiguracionGo[k][2];
              } else {
                this.matrizMRConfiguracionGo[k][2] = k + 1;
                this.matrizMRConfiguracionGo[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracionGo[k][3]) === 1) {
                myX = this.matrizMRConfiguracionGo[k][0];
                myY = this.matrizMRConfiguracionGo[k][1];
              } else {
                this.matrizMRConfiguracionGo[k][3] = 0;
                this.matrizMRConfiguracionGo[k][0] = myX;
                this.matrizMRConfiguracionGo[k][1] = myY;
              }
              myPosition = "";
              if (accion === 2) {
                this.restaYMR = 120;
                menosY = 0;
                myPosition = "position: absolute !important;";
              } else {
                this.restaYMR = 0;
              }
              myY = parseInt(myY);
              imprimir += "<div class=\"element\" id=\"myElementGo" + k + "\"  style=\"" + myPosition + " margin-left: " + myX + "px; top: " + (parseInt(myY - (menosY + this.restaYMR - this.correccionMovilY))) + "px;  font-size: 40px;\"> 					\n		<b> " + this.matrizMRConfiguracionGo[k][5] + "  </b>\n</div>	";
              imprimir2 += this.matrizMRConfiguracionGo[k][5] + " - ";
              k++;
              l++;
            } else {
              break;
            }
          }
          if (k > this.digitosMRGo) {
            break;
          }
        }
      }
      if (this.tipoMRGo === 1 || this.tipoMRGo === 3) {
        k = 0;
        fPossible = 1;
        mResta = 1;
        ii = 0;
        jj = 0;
        for (i = r = 0; r <= 4; i = ++r) {
          auxSuma = 0;
          mResta = 1;
          jj = 0;
          fModif = 1;
          for (j = s = 0; s <= 41; j = ++s) {
            if (k < this.digitosMRGo) {
              if (!(this.matrizMRConfiguracionGo[k] != null)) {
                this.matrizMRConfiguracionGo[k] = [];
              }
              if (k % 6 === 0) {
                l = 0;
                if (fPossible) {
                  fPossible = 0;
                } else {
                  fPossible = 1;
                }
                if (j !== 0) {
                  auxSuma += jSpace;
                }
              }
              if (k % 3 === 0 && j !== 0) {
                if (fModif) {
                  fModif = 0;
                  ii++;
                  jj -= 3;
                } else {
                  fModif = 1;
                  ii--;
                }
              }
              myX = 20 + jj * jSpace + auxSuma;
              myY = inicioCuadro + ii * iSpace;
              if (parseInt(this.matrizMRConfiguracionGo[k][4]) === 1) {
                this.matrizMRConfiguracionGo[k][2];
              } else {
                this.matrizMRConfiguracionGo[k][2] = k + 1;
                this.matrizMRConfiguracionGo[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracionGo[k][3]) === 1) {
                myX = this.matrizMRConfiguracionGo[k][0];
                myY = this.matrizMRConfiguracionGo[k][1];
              } else {
                this.matrizMRConfiguracionGo[k][3] = 0;
                this.matrizMRConfiguracionGo[k][0] = myX;
                this.matrizMRConfiguracionGo[k][1] = myY;
              }
              myPosition = "";
              if (accion === 2) {
                this.restaYMR = 120;
                menosY = 0;
                myPosition = "position: absolute !important;";
              } else {
                this.restaYMR = 0;
              }
              imprimir += "<div class=\"element\" id=\"myElementGo" + k + "\"  style=\"" + myPosition + " margin-left: " + myX + "px; top: " + (myY - (menosY + this.restaYMR - this.correccionMovilY)) + "px; font-size: 40px;\"> \n	<b>" + this.matrizMRConfiguracionGo[k][5] + "</b>\n</div>	";
              imprimir2 += this.matrizMRConfiguracionGo[k][5] + " - ";
              k++;
              l++;
              jj++;
            } else {
              break;
            }
          }
          ii += 1;
          if (k > this.digitosMRGo) {
            break;
          }
        }
      }
      myDivIdContent = "#screen";
      if (accion === 2) {
        myDivIdContent = ".jMsgbox-loaded";
      }
      $("" + myDivIdContent).html(imprimir);
      this.widthGo = $("#testLetter").width();
      if (accion === 0) {
        this.mostrarValores = 0;
        return killTimeout1 = setTimeout(((function(_this) {
          return function() {
            if ($("#fastMode").is(':checked')) {
              $("#screen").html("");
              if ($("#autoshow").is(':checked') || ($("#randomActive").is(':checked') && _this.ch1 !== 0)) {
                _this.killAS = setTimeout((function() {
                  _this.goMR(1);
                  if (_this.ch2 !== 0 || ($("#randomActive").is(':checked') && _this.ch2 !== 0)) {
                    return _this.killAS1 = setTimeout((function() {
                      return $("#screen").html("");
                    }), _this.ch2 * 1000);
                  }
                }), _this.ch1 * 1000);
              }
            } else {
              $("#screen").html("");
              killTimeout1 = setTimeout((function() {
                _this.respuestaMR();
                if ($("#autoshow").is(':checked') || ($("#randomActive").is(':checked') && _this.ch1 !== 0)) {
                  return _this.killAS = setTimeout((function() {
                    if (!_this.disableCheck) {
                      _this.checkMR();
                      $("#controlesMR1").show();
                    }
                    if (_this.ch2 !== 0 || ($("#randomActive").is(':checked') && _this.ch2 !== 0)) {
                      return _this.killAS1 = setTimeout((function() {
                        $("#screen").html("");
                        $("#controlesMR1").hide();
                        return _this.disableCheck = 0;
                      }), _this.ch2 * 1000);
                    }
                  }), _this.ch1 * 1000);
                }
              }), 2000);
            }
            if ($("#autoplay").is(':checked') || $("#randomActive").is(':checked')) {
              return _this.killAutoplay = setTimeout((function() {
                if ($("#limitautoplay").is(':checked')) {
                  if (_this.pasadas === parseInt($("#cantidadLimitAutoplay").val())) {
                    _this.pasadas = 0;
                    return;
                  }
                }
                return _this.goMR(0);
              }), _this.tAutoplay);
            }
          };
        })(this)), this.tiempoMRGo);
      }
    };

    motorReaction.prototype.checkboxAction = function(accion, name, cantidad, yy) {
      var m, n, o, ref, ref1, ref2, xx;
      if (accion === "all") {
        for (xx = m = 0, ref = cantidad; 0 <= ref ? m <= ref : m >= ref; xx = 0 <= ref ? ++m : --m) {
          $("#" + name + xx).prop('checked', true);
        }
      }
      if (accion === "random") {
        for (xx = n = 0, ref1 = cantidad; 0 <= ref1 ? n <= ref1 : n >= ref1; xx = 0 <= ref1 ? ++n : --n) {
          if (_.random(0, 1)) {
            $("#" + name + xx).prop('checked', true);
          } else {
            $("#" + name + xx).prop('checked', false);
          }
        }
      }
      if (accion === "quitar") {
        for (xx = o = 0, ref2 = cantidad; 0 <= ref2 ? o <= ref2 : o >= ref2; xx = 0 <= ref2 ? ++o : --o) {
          if ($("#" + name + xx).is(':checked')) {
            $("#" + name + xx).prop('checked', false);
          }
        }
        return $("#" + name + yy).prop('checked', true);
      }
    };

    motorReaction.prototype.abrirMR = function() {
      var arrayAux, i, j, k, m, n, o, p, ref, ref1, ref2, ref3, results, select;
      this.matrizMRConfiguracion = [];
      this.selectedMRAccion = parseInt($('#abrirMR').val());
      k = 0;
      for (i = m = 0, ref = this.todasConfiguracionesMR.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        if (i === parseInt($('#abrirMR').val())) {
          $('#tipoMR').val(this.todasConfiguracionesMR[i][1]);
          $('#tiempoMR').val(this.todasConfiguracionesMR[i][2]);
          $('#digitosMR').val(this.todasConfiguracionesMR[i][3]);
          for (j = n = 0, ref1 = this.todasConfiguracionesMR[i][4].length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; j = 0 <= ref1 ? ++n : --n) {
            this.matrizMRConfiguracion[k] = [];
            arrayAux = [];
            arrayAux = this.todasConfiguracionesMR[i][4][j];
            this.matrizMRConfiguracion[k][0] = parseInt(arrayAux[0]);
            this.matrizMRConfiguracion[k][1] = parseInt(arrayAux[1]);
            this.matrizMRConfiguracion[k][2] = parseInt(arrayAux[2]);
            this.matrizMRConfiguracion[k][3] = 1;
            this.matrizMRConfiguracion[k][4] = 1;
            k++;
          }
          break;
        }
      }
      this.matrizSeleccionMR = [];
      $("#seleccionMR").val("");
      $("#siguienteMR").val("");
      $('#abrirMR').html('');
      for (i = o = 0, ref2 = this.todasConfiguracionesMR.length - 1; 0 <= ref2 ? o <= ref2 : o >= ref2; i = 0 <= ref2 ? ++o : --o) {
        select = "";
        if (i === this.selectedMRAccion) {
          select = "  selected";
        }
        $('#abrirMR').append("<option value=\"" + i + "\" " + select + ">" + this.todasConfiguracionesMR[i][0] + "</option>");
      }
      $('#abrirMR1').html('');
      results = [];
      for (i = p = 0, ref3 = this.todasConfiguracionesMR.length - 1; 0 <= ref3 ? p <= ref3 : p >= ref3; i = 0 <= ref3 ? ++p : --p) {
        select = "";
        if (i === 0) {
          select = "  selected";
        }
        results.push($('#abrirMR1').append("<option value=\"" + i + "\" " + select + ">" + this.todasConfiguracionesMR[i][0] + "</option>"));
      }
      return results;
    };

    motorReaction.prototype.iniciarMR = function() {
      var i, m, myCookie, ref, save, seleccionado;
      this.configurarMR();
      if (userId === 0) {
        myCookie = localStorage.getItem("initMR");
        if (!(myCookie != null)) {
          save = "Nuevo*" + $("#tipoMR").val() + "*" + $("#tiempoMR").val() + "*" + $("#digitosMR").val() + "*";
          for (i = m = 0, ref = this.matrizMRConfiguracion.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            save += (parseInt(this.matrizMRConfiguracion[i][0])) + " " + (parseInt(this.matrizMRConfiguracion[i][1])) + " " + this.matrizMRConfiguracion[i][2];
            if (i !== this.matrizMRConfiguracion.length - 1) {
              save += "-";
            }
          }
          seleccionado = this.todasConfiguracionesMR.length;
          localStorage.setItem("initMR", save);
        }
        this.cargarMR();
        return $("#configuraciones-mr").val(myCookie);
      } else {
        return $.post('/cargarConfiguracionesMr', {}).done((function(_this) {
          return function(data) {
            var cargaConfiguracionesMr;
            alert(data);
            $("#configuraciones-mr").val(data);
            cargaConfiguracionesMr = data;
            _this.cargarMR();
            $('#abrirMR1').prop('disabled', false);
          };
        })(this));
      }
    };

    motorReaction.prototype.cargarMR = function() {
      var arrayBase, arrayBase1, arrayBase2, arrayBase3, auxBase, auxBase1, auxBase2, i, j, k, m, myCookie, n, o, p, poner, q, ref, ref1, ref2, ref3, ref4, results, select;
      if (userId === 0) {
        myCookie = localStorage.getItem("initMR");
      } else {
        myCookie = cargaConfiguracionesMr;
      }
      this.todasConfiguracionesMR = [];
      k = 0;
      arrayBase = [];
      arrayBase = myCookie.split("|");
      for (i = m = 0, ref = arrayBase.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        auxBase = arrayBase[i];
        arrayBase1 = auxBase.split("*");
        this.todasConfiguracionesMR[k] = [];
        this.todasConfiguracionesMR[k][0] = arrayBase1[0];
        this.todasConfiguracionesMR[k][1] = arrayBase1[1];
        this.todasConfiguracionesMR[k][2] = arrayBase1[2];
        this.todasConfiguracionesMR[k][3] = arrayBase1[3];
        this.todasConfiguracionesMR[k][5] = arrayBase1[5];
        this.todasConfiguracionesMR[k][5] = 0;
        auxBase1 = arrayBase1[4];
        arrayBase2 = auxBase1.split("-");
        this.todasConfiguracionesMR[k][4] = [];
        for (j = n = 0, ref1 = arrayBase2.length - 1; 0 <= ref1 ? n <= ref1 : n >= ref1; j = 0 <= ref1 ? ++n : --n) {
          this.todasConfiguracionesMR[k][4][j] = [];
          auxBase2 = arrayBase2[j];
          arrayBase3 = auxBase2.split(" ");
          this.todasConfiguracionesMR[k][4][j][0] = arrayBase3[0];
          this.todasConfiguracionesMR[k][4][j][1] = arrayBase3[1];
          this.todasConfiguracionesMR[k][4][j][2] = arrayBase3[2];
        }
        k++;
      }
      j++;
      k--;
      $('#abrirMR').html('');
      for (i = o = 0, ref2 = this.todasConfiguracionesMR.length - 1; 0 <= ref2 ? o <= ref2 : o >= ref2; i = 0 <= ref2 ? ++o : --o) {
        select = "";
        if (i === this.selectedMRAccion) {
          select = "  selected";
        }
        $('#abrirMR').append("<option value=\"" + i + "\" " + select + ">" + this.todasConfiguracionesMR[i][0] + "</option>");
      }
      $('#abrirMR1').html('');
      $('#lista').html("");
      for (i = p = 0, ref3 = this.todasConfiguracionesMR.length - 1; 0 <= ref3 ? p <= ref3 : p >= ref3; i = 0 <= ref3 ? ++p : --p) {
        select = "";
        if (i === 0) {
          select = "  selected";
        }
        $('#abrirMR1').append("<option value=\"" + i + "\" " + select + ">" + this.todasConfiguracionesMR[i][0] + "</option>");
        $('#lista').append("<div><input type=\"checkbox\" id=\"itemRandom" + i + "\" checked><div style=\"width: 50px !important; float: left;\">" + (this.todasConfiguracionesMR[i][0].substring(0, 10)) + "</div><input type=\"text\" style=\"width: 35px;\" value=\"" + 1000. + "\" id=\"itemRandomText" + i + "\">ms<input type=\"text\" style=\"width: 20px;\" value=\"0\" id=\"itemRandomText1" + i + "\">s<input type=\"text\" style=\"width: 20px;\" value=\"0\" id=\"itemRandomText2" + i + "\">s</div><br>");
      }
      $("#randomAll").click((function(_this) {
        return function() {
          return _this.checkboxAction("all", "itemRandom", _this.todasConfiguracionesMR.length - 1, -1);
        };
      })(this));
      $("#randomNone").click((function(_this) {
        return function() {
          return _this.checkboxAction("quitar", "itemRandom", _this.todasConfiguracionesMR.length - 1, -1);
        };
      })(this));
      $("#randomRandom").click((function(_this) {
        return function() {
          return _this.checkboxAction("random", "itemRandom", _this.todasConfiguracionesMR.length - 1, -1);
        };
      })(this));
      $("#setAllRandom").click((function(_this) {
        return function() {
          var q, ref4, results;
          results = [];
          for (i = q = 0, ref4 = _this.todasConfiguracionesMR.length - 1; 0 <= ref4 ? q <= ref4 : q >= ref4; i = 0 <= ref4 ? ++q : --q) {
            $("#itemRandomText1" + i).val($("#allRandomText1").val());
            $("#itemRandomText2" + i).val($("#allRandomText2").val());
            results.push($("#itemRandomText" + i).val($("#allRandomText").val()));
          }
          return results;
        };
      })(this));
      $("#resetAllRandom").click((function(_this) {
        return function() {
          var q, ref4, results;
          results = [];
          for (i = q = 0, ref4 = _this.todasConfiguracionesMR.length - 1; 0 <= ref4 ? q <= ref4 : q >= ref4; i = 0 <= ref4 ? ++q : --q) {
            $("#itemRandomText1" + i).val(0);
            $("#itemRandomText2" + i).val(0);
            results.push($("#itemRandomText" + i).val(1000));
          }
          return results;
        };
      })(this));
      results = [];
      for (i = q = 0, ref4 = this.todasConfiguracionesMR.length - 1; 0 <= ref4 ? q <= ref4 : q >= ref4; i = 0 <= ref4 ? ++q : --q) {
        if (i === parseInt($('#abrirMR1').val())) {
          poner = parseInt(this.todasConfiguracionesMR[i][2]);
          results.push($("#tiempoGo").html(poner));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    motorReaction.prototype.configurarMR = function() {
      var auxSuma, emptyColumBin, emptyColumBin8, emptyColumns, emptyColumsDec, emptyColumsLetters, especial, fModif, fPossible, finL, i, iSpace, ii, imprimir, inicioCuadro, j, jSpace, jj, k, l, limitColums, m, mResta, maxColumnsBin, maxColumnsBin8, maxColumnsDec, maxColumnsLetters, myX, myY, n, o, p, poneleColor, ponerPossible, possible, possible1, possible2, possible3, possible4, possible5, q, ref, ref1, results, txt, x;
      this.tipoMR = parseInt($("#tipoMR").val());
      this.digitosMR = parseInt($("#digitosMR").val());
      emptyColumsDec = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
      emptyColumBin = [3, 6, 9, 12, 15, 18];
      emptyColumsLetters = [2, 4, 7, 12, 13, 16, 19, 22, 25, 28];
      emptyColumBin8 = [4, 7, 10, 13, 16, 19];
      possible = "abcdefghijklmnopqrstuvwxyz";
      txt = possible.charAt(_.random(0, possible.length - 1));
      possible1 = "0123456789";
      possible2 = "101010";
      possible3 = "010101";
      possible4 = "10101010";
      possible5 = "01011010";
      maxColumnsDec = 22;
      maxColumnsBin = 21;
      maxColumnsBin8 = 23;
      maxColumnsLetters = 22;
      iSpace = 30;
      jSpace = 30;
      imprimir = "";
      inicioCuadro = $(".wrapper").position();
      inicioCuadro = inicioCuadro.top;
      if (this.tipoMR === 0) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible1;
        finL = 10;
      }
      if (this.tipoMR === 1) {
        emptyColumns = emptyColumBin;
        ponerPossible = possible2;
        finL = 5;
      }
      if (this.tipoMR === 3) {
        emptyColumns = emptyColumBin8;
        ponerPossible = possible4;
        finL = 7;
      }
      if (this.tipoMR === 2) {
        emptyColumns = emptyColumsDec;
        ponerPossible = possible;
        finL = 26;
      }
      l = 0;
      if (this.tipoMR === 0 || this.tipoMR === 2) {
        k = 0;
        for (i = m = 0; m <= 20; i = ++m) {
          auxSuma = 0;
          for (j = n = 0; n <= 19; j = ++n) {
            if (l === finL) {
              l = 0;
            }
            if (k < this.digitosMR) {
              if (!(this.matrizMRConfiguracion[k] != null)) {
                this.matrizMRConfiguracion[k] = [];
                this.matrizMRConfiguracion[k][4] = 0;
                this.matrizMRConfiguracion[k][5] = 0;
              } else {
                this.matrizMRConfiguracion[k][4] = 1;
                this.matrizMRConfiguracion[k][5] = 1;
              }
              if (_.find(emptyColumns, (function(_this) {
                return function(num) {
                  return num === j;
                };
              })(this))) {
                auxSuma += jSpace;
              }
              myX = 20 + j * jSpace + auxSuma;
              myY = inicioCuadro + i * iSpace;
              if (parseInt(this.matrizMRConfiguracion[k][4]) === 1) {
                this.matrizMRConfiguracion[k][2];
              } else {
                this.matrizMRConfiguracion[k][2] = k + 1;
                this.matrizMRConfiguracion[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracion[k][5]) === 1) {
                myX = this.matrizMRConfiguracion[k][0];
                myY = this.matrizMRConfiguracion[k][1];
              } else {
                this.matrizMRConfiguracion[k][3] = 0;
                this.matrizMRConfiguracion[k][0] = myX;
                this.matrizMRConfiguracion[k][1] = myY;
              }
              if (this.matrizSeleccionMR.length === 0) {
                this.matrizMRConfiguracion[k][6] = 0;
              }
              poneleColor = "color: rgb(0, 0, 0);";
              if (this.matrizMRConfiguracion[k][6] === 1) {
                poneleColor = "color: rgb(160, 160, 160);";
              }
              imprimir += "<div class=\"element colorElement\" id=\"myElement" + k + "\"  style=\"" + poneleColor + " margin-left: " + myX + "px; top: " + myY + "px; font-size: 40px;\"> 					\n		<b title=\"" + k + "\"> " + (ponerPossible.charAt(l)) + "  </b>\n</div>	\n<script>\n	$(\"#myElement" + k + "\").click(function(){\n		if(window.juegoReaction.matrizMRConfiguracion[" + k + "][6]==1){\n			$(\"#myElement" + k + "\").css(\"color\",\"rgb(0, 0, 0)\"); \n			window.juegoReaction.matrizMRConfiguracion[" + k + "][6]=0;\n\n		}else{\n			$(\"#myElement" + k + "\").css(\"color\",\"rgb(160, 160, 160)\"); \n			window.juegoReaction.matrizMRConfiguracion[" + k + "][6]=1;\n		}\n	});\n\n</script>";
              k++;
              l++;
            } else {
              break;
            }
          }
          if (k > this.digitosMR) {
            break;
          }
        }
      }
      if (this.tipoMR === 1 || this.tipoMR === 3) {
        k = 0;
        fPossible = 1;
        mResta = 1;
        ii = 0;
        jj = 0;
        especial = 0;
        for (i = o = 0; o <= 4; i = ++o) {
          auxSuma = 0;
          mResta = 1;
          jj = 0;
          fModif = 1;
          if (this.tipoMR === 1) {
            limitColums = 41;
          } else {
            limitColums = 47;
          }
          for (j = p = 0, ref = limitColums; 0 <= ref ? p <= ref : p >= ref; j = 0 <= ref ? ++p : --p) {
            if (k < this.digitosMR) {
              if (!(this.matrizMRConfiguracion[k] != null)) {
                this.matrizMRConfiguracion[k] = [];
                this.matrizMRConfiguracion[k][4] = 0;
                this.matrizMRConfiguracion[k][5] = 0;
              } else {
                this.matrizMRConfiguracion[k][4] = 1;
                this.matrizMRConfiguracion[k][5] = 1;
              }
              if (this.tipoMR === 1) {
                if (k % 6 === 0) {
                  l = 0;
                  if (fPossible) {
                    ponerPossible = possible2;
                    fPossible = 0;
                  } else {
                    ponerPossible = possible3;
                    fPossible = 1;
                  }
                  if (j !== 0) {
                    auxSuma += jSpace;
                  }
                }
              } else {
                if (k % 8 === 0) {
                  l = 0;
                  if (fPossible) {
                    ponerPossible = possible4;
                    fPossible = 0;
                  } else {
                    ponerPossible = possible5;
                    fPossible = 1;
                  }
                  if (j !== 0) {
                    auxSuma += jSpace;
                  }
                }
              }
              if (this.tipoMR === 1) {
                if (k % 3 === 0 && j !== 0) {
                  if (fModif) {
                    fModif = 0;
                    ii++;
                    jj -= 3;
                  } else {
                    fModif = 1;
                    ii--;
                  }
                }
              } else {
                if (k % 4 === 0 && j !== 0) {
                  if (fModif) {
                    fModif = 0;
                    ii++;
                    jj -= 4;
                  } else {
                    fModif = 1;
                    ii--;
                  }
                }
              }
              myX = 20 + jj * jSpace + auxSuma;
              myY = inicioCuadro + ii * iSpace;
              if (parseInt(this.matrizMRConfiguracion[k][4]) === 1) {
                this.matrizMRConfiguracion[k][2];
              } else {
                this.matrizMRConfiguracion[k][2] = k + 1;
                this.matrizMRConfiguracion[k][4] = 0;
              }
              if (parseInt(this.matrizMRConfiguracion[k][5]) === 1) {
                myX = this.matrizMRConfiguracion[k][0];
                myY = this.matrizMRConfiguracion[k][1];
              } else {
                this.matrizMRConfiguracion[k][3] = 0;
                this.matrizMRConfiguracion[k][0] = myX;
                this.matrizMRConfiguracion[k][1] = myY;
              }
              if (this.matrizSeleccionMR.length === 0) {
                this.matrizMRConfiguracion[k][6] = 0;
              }
              poneleColor = "color: rgb(0, 0, 0);";
              if (this.matrizMRConfiguracion[k][6] === 1) {
                poneleColor = "color: rgb(160, 160, 160);";
              }
              imprimir += "<div class=\"element\" id=\"myElement" + k + "\"  style=\"" + poneleColor + " margin-left: " + myX + "px; top: " + myY + "px; font-size: 40px;\"> \n	<b title=\"" + k + "\">" + (ponerPossible.charAt(l)) + "</b>\n</div>	\n<script>\n	$(\"#myElement" + k + "\").click(function(){\n		if(window.juegoReaction.matrizMRConfiguracion[" + k + "][6]==1){\n			$(\"#myElement" + k + "\").css(\"color\",\"rgb(0, 0, 0)\"); \n			window.juegoReaction.matrizMRConfiguracion[" + k + "][6]=0;\n\n		}else{\n			$(\"#myElement" + k + "\").css(\"color\",\"rgb(160, 160, 160)\"); \n			window.juegoReaction.matrizMRConfiguracion[" + k + "][6]=1;\n		}\n	});\n</script>";
              $(".container").html(imprimir);
              k++;
              l++;
              jj++;
            } else {
              break;
            }
          }
          ii += 1;
          if (k > this.digitosMR) {
            break;
          }
        }
      }

      /*
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
       */
      $(".container").html(imprimir);
      results = [];
      for (x = q = 0, ref1 = this.matrizMRConfiguracion.length - 1; 0 <= ref1 ? q <= ref1 : q >= ref1; x = 0 <= ref1 ? ++q : --q) {
        $("myElement" + x).unbind('click');
        results.push(eval("$(\"#myElement" + x + "\").click(function() {\n\n	fPoner = 1;\n	sacar = [];\n\n	for(j=0;j<window.juegoReaction.matrizSeleccionMR.length;j++){\n		if (window.juegoReaction.matrizSeleccionMR[j] == " + x + "){\n			fPoner = 0;\n			sacar[0] = " + x + ";\n\n			window.juegoReaction.matrizSeleccionMR = _.difference(window.juegoReaction.matrizSeleccionMR, sacar) ;\n		}\n		\n	}\n\n	if (fPoner){\n\n		window.juegoReaction.matrizSeleccionMR = _.union(window.juegoReaction.matrizSeleccionMR, " + x + ");\n		myVal = _.map(window.juegoReaction.matrizSeleccionMR, function(num){ return num; })\n		\n		$(\"#seleccionMR\").val(myVal);\n		\n	}\n\n	window.juegoReaction.matrizSeleccionMR = _.sortBy(window.juegoReaction.matrizSeleccionMR, function(num){ return num; });\n\n	myVal = _.map(window.juegoReaction.matrizSeleccionMR, function(num){ return num; });\n		\n	$(\"#seleccionMR\").val(myVal);\n\n	if (window.juegoReaction.matrizSeleccionMR.length == 1){\n\n		$(\"#siguienteMR\").val(window.juegoReaction.matrizMRConfiguracion[" + x + "][2]);\n	}else{\n		$(\"#siguienteMR\").val(\"\");\n\n	}\n});"));
      }
      return results;
    };

    motorReaction.prototype.checkboxAction = function(accion, name, cantidad, yy) {
      var m, n, o, ref, ref1, ref2, xx;
      if (accion === "all") {
        for (xx = m = 0, ref = cantidad; 0 <= ref ? m <= ref : m >= ref; xx = 0 <= ref ? ++m : --m) {
          $("#" + name + xx).prop('checked', true);
        }
      }
      if (accion === "random") {
        for (xx = n = 0, ref1 = cantidad; 0 <= ref1 ? n <= ref1 : n >= ref1; xx = 0 <= ref1 ? ++n : --n) {
          if (_.random(0, 1)) {
            $("#" + name + xx).prop('checked', true);
          } else {
            $("#" + name + xx).prop('checked', false);
          }
        }
      }
      if (accion === "quitar") {
        for (xx = o = 0, ref2 = cantidad; 0 <= ref2 ? o <= ref2 : o >= ref2; xx = 0 <= ref2 ? ++o : --o) {
          if ($("#" + name + xx).is(':checked')) {
            $("#" + name + xx).prop('checked', false);
          }
        }
        return $("#" + name + yy).prop('checked', true);
      }
    };

    motorReaction.prototype.cls = function() {
      return $("#screen").html("<h4>&nbsp;</h4>");
    };

    return motorReaction;

  })();

  $(window).load(function() {
    return window.juegoReaction = new motorReaction();
  });

}).call(this);

