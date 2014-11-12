/*VALIDATHOR JS - Author: Jérémy Chamois 
http://github.com/jchamois/validathor-plugin */

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
                return regEx[validationType].test(input.val())
                 
            },
              errorMessage : function(input){
                return $(input).data('error-message')
            }
            
        },
        "postCode" : {
            process : function(input,validationType){   
                  return regEx[validationType].test(input.val())
            },
              errorMessage : function(input){
                return $(input).data('error-message')
            }

        },
        "phone" : {
            process : function(input,validationType){
                  return regEx[validationType].test(input.val())
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
                return input.is(':checked')
                 
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
               
                if(radioGroup.find('input[type="radio"]:checked').length > 0){
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

                return $(input).find('option:selected').val() != 0
             
            },
             errorMessage : function(input){
                return $(input).data('error-message')
            } 
        }   
    }
}

;(function ( $, window, document, undefined ) {
    var pluginName = 'validaThor',
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
    };

    Plugin.prototype.isValid = function() {
        return !$('[required]:visible', this.element).closest(this.options.parentInput).hasClass(this.options.errorClass)
    };

    Plugin.prototype.init = function () {
  
        var self = this

        // AU SUBMIT
       $(self.element).on('submit', function(event){ 
            $('[required]:visible',self.element).each(function(){
                self.validate(this)
            })
            //Si erreur je lance onErrorSubmit

            if($('.'+self.options.errorClass, self.element).length > 0){
                self.options.onErrorSubmit(self.element, event)
             }else{ // si pas erreur
                
                $(self.element).off('submit') // detruit le submit naturel

                self.options.onSuccessSubmit(self.element, event)
              
              
            }
        }).on('blur','[required][type="text"]:visible, textarea[required]:visible', function(event){
            self.validate(this)
        }).on('change', 'select[required]:visible,[required][type="checkbox"]:visible, [required][type="radio"]:visible', function(event){
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
