
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "checkForm",
			defaults = {
				parentInput : 'class',
				errorClass : 'class',
				errorMessageClass : 'class',
				requiredClass : 'class',
				onErrorSubmit : null,
				onSuccessSubmit : null,
				onErrorfield : null,
			},
			regEx = {
				email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
				postCode : /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
				phone : /^0[1-6]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/
			},
			validations = {
				// Input type text
				"text" : {
					"empty" : {
						process : function(input,validationType){
							if(input.val() == ""){
								return false
							}else{
								return true
							}	
						},
						errorMessage : "Ce champ ne peut pas etre vide."	
					},
					"email" : {
						process : function(input,validationType){
							if(!regEx[validationType].test(input.val())){
								return false
							}else{
								return true
							}	
						},
						errorMessage : "Veuillez entrer un email valide."
					},
					"postCode" : {
						process : function(input,validationType){	
							if(!regEx[validationType].test(input.val())){
								return false
							}else{
								return true
							}	
						},
						errorMessage : "Veuillez entrer un code postal valide."

					},
					"phone" : {
						process : function(input,validationType){
							if(!regEx[validationType].test(input.val())){
								return false
							}else{
								return true
							}	
						},
						errorMessage : "Veuillez entrer un numero de téléphone valide."

					}
				},
				// Input type checkbox
				"checkbox" : {
					"checked" :{
						process : function(input,validationType){
							if(input.is(':checked')){
								return true
							}else{
								return false
							}	
						},
						errorMessage : "Veuillez cocher cette case."
					}

				},	
		 		// Input type radio
		 		"radio" : {
		 			"checked" :{
		 				process : function(input,validationType){
		 					var radioGroup = $(input).closest('.radio-group')

		 					if(radioGroup.find('input[type="radio"]:checked').length){
		 						return true
		 					}else{	
		 						return false
		 					}	
		 				},
		 				errorMessage : "Veuillez cocher au moins une case."
		 			}
		 		},	
				// select
				"select" : {
					"selected":{
						process : function(input,validationType){

							if($(input).find('option:selected').val() !=0){
								return true
							}else{	
								return false
							}	
						},
						errorMessage : "Veuillez choisr une option."	
					}	
				}
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
	
				self = this;
				self.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				self.settings = $.extend( {}, defaults, options );
				self._defaults = defaults;
				self._name = pluginName;

				function _validator(field){
					console.log(self)

					var input = field,
						inputType = ($(input).is("input")) ? $(input).attr('type') : 'select',
						testToRun = $(input).data('validation').split(',')
				
					// testToRun return un aray avec 1 ou plusiuers test
					$(testToRun).each(function(index){
						var validationType = testToRun[index], // quel type de valid ?
						    validation =  validations[inputType][validationType].process // Select la bonne fonction

						if(!validation($(input),validationType)){ // si la valid est fausse

							/*ADDCLASS erreur */
							if(!$(input).closest('.'+self.settings.parentInput).hasClass(self.settings.errorClass)){ //et si l'element n a pas deja d'erreur
								/*CALLBACK => onErrorField*/
								if(self.settings.onErrorfield){
									self.settings.onErrorfield($(input))
								}
								$(input) // je met la class erreur
									.closest('.'+self.settings.parentInput)
									.addClass(self.settings.errorClass)
									.append('<p class="'+self.settings.errorMessageClass+'">'+validations[inputType][validationType].errorMessage+'</p>')
							}

						}else{

							$(input) // sinon valid est true, j enleve l erreur
								.closest('.'+self.settings.parentInput)
								.removeClass(self.settings.errorClass)
								.find('.'+self.settings.errorMessageClass)
								.remove()

							/*if(this.settings.onSuccessfield){
								this.settings.onSuccessfield($(input))
							} */
						}	
					})
				};

				function _handlerSubmit(form, event){
				
					submited = true // le submit a été fait une fois
					
					// lance la valid sur chaque champ
					$('.'+self.settings.requiredClass,form).each(function(){
						_validator(this)		
					})

					//Si erreur je lance onErrorSubmit

					if($('.'+self.settings.errorClass, form).length){
						if(self.settings.onErrorSubmit){
							self.settings.onErrorSubmit(form, event)
						}

					}else{ // si pas erreur
						if(self.settings.onSuccessSubmit){
							self.settings.onSuccessSubmit(form, event)
						}
					}
				};

				function init(){
					console.log('init')
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).

					submited = false // un submit a été fait
					
					/* AU SUBMIT */
					$(element).on('submit', function(event){	
						event.preventDefault()
						_handlerSubmit(self.element, event)
					})
				
					/*AU BLUR */
					$(element).on('blur', '.'+self.settings.requiredClass, function(){
						if(submited == true){
							_validator(this)
						}	
					})

				}

				init();
		}

		Plugin.prototype = {
			addTest : function(){
				alert('addtest')
			}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {

			 return this.each(function() {
					if ( !$.data( this, 'pluginName' ) ) {
						$.data( this, 'pluginName', new Plugin(this, options ) );
					}else if (Plugin.prototype[options]) {
		                $.data(this, pluginName)[options]();
		            }
			});

			// chain jQuery functions
			return this;
		};

})( jQuery, window, document );



$(document).ready(function(){
	$("form").checkForm({
		parentInput : 'row',
		errorClass : 'error',
		errorMessageClass : 'error-message',
		requiredClass : 'required',
		onErrorSubmit : function(form,event){
			event.preventDefault()
		},
		onSuccessSubmit : function(form,event){
			event.preventDefault()
	
			alert("succeess")
		},
		onErrorfield : function(input){
			console.log('erreur sur',input)
		}
	});

	 //$("form").data('checkForm').addTest();
			
	//var validation = new checkForm('.form')
})