/*VALIDATHOR JS - Author: Jérémy Chamois 
http://github.com/jchamois/validathor-plugin */

;(function ( $, window, document, undefined ) {
regEx = {
    email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    postCode : /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
    phone : /^0[1-6]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/
},

validations = {
    // Input type text
    pattern : function(input, regex, msg){
        return regEx[regex].test($(input).val())
      
    },
    emptyInput : function(input){
        return !$(input).val() == ""
    }
   
}
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
            testToRun = $(input).attr('data-validation').split(';')
 
        $(testToRun).each(function(key, value){

            var validation = JSON.parse(value),
                validationName = validation.name,
                validationRegex = validation.regex,
                validationErrorMsg = validation.errorMsg,
                $parentInput =  $(input).closest(self.options.parentInput)

               if(!validations[validationName](input,validationRegex, validationErrorMsg)){ // si la validation return false

                    if(!self.options.errorSummary){ // cas sans erreur affichées en haut

                        // ADD MESSAGE ERREUR

                        if($parentInput.find('[data-field='+validationName+']').length == 0){ // si le message d'erreur n'existe pas déja je l'append
                              $(input) 
                                .closest(self.options.parentInput)
                                .append('<p class="'+self.options.errorMessageClass+'" data-field="'+validationName+'">'+validationErrorMsg+'</p>')
                        }
                        
                         // ADD CLASS ERROR 

                        if(!$parentInput.hasClass(self.options.errorClass)){ // et si le parent de l'elem n'a pas deja la class d'erreur, je l'ajoute

                            $(input)
                                .closest(self.options.parentInput)
                                .addClass(self.options.errorClass)
                         }

                    }else{ // si on a choisi l affichage en mode recap A FAIRE

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

                // si valid est true, je rcherche le error message associé au champ et je le remove
                 $parentInput
                    .find('[data-field='+validationName+']')
                    .remove()

                if($parentInput.find('.'+self.options.errorMessageClass+':visible').length == 0){
                    // si il n'y a plus de message d'erreur visible de présent j'enlève la classe erreur
                    $parentInput 
                        .removeClass(self.options.errorClass)

                }
                // if(self.options.errorSummary){
                //     $(self.options.summaryEl).find('[data-field='+validationType+']').remove()
                // }
            } 

        })
    };

    Plugin.prototype.isValid = function() {
        return !$('[required]:visible', this.element).closest(this.options.parentInput).hasClass(this.options.errorClass)
    };

    Plugin.prototype.init = function () {

        var self = this;

        // AU SUBMIT
       $(self.element).on('submit', function(event){ 
          
            $('[required]:visible',self.element).each(function(){
                self.validate(this)
            })

            //Si erreur je lance onErrorSubmit
            if($('.'+self.options.errorClass+':visible', self.element).length > 0){
           
                self.options.onErrorSubmit(self.element, event)

             }else{ // si pas erreur

                $(self.element).off('submit') // detruit le submit naturel

                self.options.onSuccessSubmit(self.element, event)
            }
           
        }).on('blur','input[required]:not([type="submit"]):not([type="radio"]):not([type="checkbox"]),textarea[required]', function(event){

            self.validate(this)

        }).on('change','select[required]:visible,[required][type="checkbox"]:visible, [required][type="radio"]:visible', function(event){

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



elf.options.summaryEl).find('[data-field='+validationType+']').remove()
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
