
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
            	return !input.val() == ""
            },
            errorMessage : function(input){
            	return $(input).data('error-message')
            }
        },
        "email" : {
            process : function(input,validationType){
                if(!regEx[validationType].test(input.val())){
                    return false
                }else{
                    return true
                }   
            },
              errorMessage : function(input){
            	return $(input).data('error-message')
            }
          	
        },
        "postCode" : {
            process : function(input,validationType){   
                if(!regEx[validationType].test(input.val())){
                    return false
                }else{
                    return true
                }   
            },
         	  errorMessage : function(input){
            	return $(input).data('error-message')
            }

        },
        "phone" : {
            process : function(input,validationType){
                if(!regEx[validationType].test(input.val())){
                    return false
                }else{
                    return true
                }   
            },
              errorMessage : function(input){
            	return $(input).data('error-message')
            }
          	

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
             errorMessage : function(input){
            	return $(input).data('error-message')
            }
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
             errorMessage : function(input){
            	return $(input).data('error-message')
            }
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
             errorMessage : function(input){
            	return $(input).data('error-message')
            } 
        }   
    }
}

;(function ( $, window, document, undefined ) {
    var pluginName = 'validathor',
        defaults = {
	    	parentInput : 'class',
			errorClass : 'class',
			errorMessageClass :'class',
			requiredClass : 'class',
			onErrorSubmit : null,
			onSuccessSubmit : null,
			onErrorfield : null,
			errorSummary: false,
			summaryEl:'.error-tab',
			summaryElTag : 'span',
			summaryElTagClass: 'class'
        };

 
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.validate = function(input){

    	var self = this,
			inputType = ($(input).is("input")) ? $(input).attr('type') : $(input)[0].tagName.toLowerCase(),
			testToRun = $(input).data('validation').split(',')
	
		// testToRun return un array avec 1 ou plusieurs test

		$(testToRun).each(function(index){ // nobe de test dans data-validation

			var validationType = testToRun[index], // quel type de valid ?
			    validation = validations[inputType][validationType].process // Select la bonne fonction

			if(!validation($(input),validationType)){ // si la valid est fausse
				
				if(!self.options.errorSummary){ //cas sans erreur en haut
				
					/*ADDCLASS erreur */

					if(!$(input).closest(self.options.parentInput).hasClass(self.options.errorClass)){ //et si l'element n'a pas deja d'erreur
					
						$(input) // je met la class erreur sur le parent
							.closest(self.options.parentInput)
							.addClass(self.options.errorClass)
							.append('<p class="'+self.options.errorMessageClass+'">'+validations[inputType][validationType].errorMessage(input)+'</p>')
					}

				}else{ // si on a choisi l affichage en mode recap

					$(input) // et je met la class erreur sur le parent
						.closest(self.options.parentInput)
						.addClass(self.options.errorClass)

					if($('[data-field="'+validationType+'"]').length == 0){
						
						$(self.options.summaryEl)
							.append('<'+self.options.summaryElTag+' class='+self.options.summaryElTagClass+' data-field="'+validationType+'">'+validations[inputType][validationType].errorMessage(input)+'</'+self.options.summaryElTag+'>')
							.show()
					}	

				}

				// CALLBACK => onErrorField

				if(self.options.onErrorfield){
					self.options.onErrorfield($(input))
				}

			}else{ // si le champ est valide

				$(input) // sinon valid est true, je retire l erreur
					.closest(self.options.parentInput)
					.removeClass(self.options.errorClass)
					.find('.'+self.options.errorMessageClass)
					.remove()

					if(self.options.errorSummary){
						$(self.options.summaryEl).find('[data-field='+validationType+']').remove()
					}
			}	
		})	

		self.isValid()	
    };

    Plugin.prototype.isValid = function() {
		return !$('[required]:visible', this.element).closest(this.options.parentInput).hasClass(this.options.errorClass)
    };

    Plugin.prototype.init = function () {

    	var self = this

    	// AU SUBMIT
       $(self.element).on('submit', function(event){ 

            $(self.options.requiredClass,self.element).each(function(){
                self.validate(this)
            })
            //Si erreur je lance onErrorSubmit

            if($('.'+self.options.errorClass, self.element).length){
                self.options.onErrorSubmit(self.element, event)
             }else{ // si pas erreur
                self.options.onSuccessSubmit(self.element, event)
              
            }
        })
        // AU BLUR 
        $(self.element).on('blur',self.options.requiredClass, function(){
           self.validate(this)
        })
            	
    };

    $.fn[pluginName] = function ( options ) {

        return this.each(function () {
        	
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, 
                new Plugin( this, options ));
            }
        });
    }
})( jQuery, window, document );