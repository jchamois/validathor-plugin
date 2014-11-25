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
            parentInput : '[data-parent="field"]',
            errorClass : 'error',
            errorMessageClass : 'error-message',
            errorTag:'p',
            positionError:'after', // before or after
            requiredClass:'[required]',
            onBlur:true,
            onSubmit:true,
            onChange:true,
            onErrorSubmit : function(){},
            onSuccessSubmit : function(){},
            onErrorfield : function(){},
            errorSummary: false,
            errorContainer:'.error-block',
            errorContainerTag : 'p',
            errorContainerTagClass: 'error-summary',
        }
 
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }


    Plugin.prototype.validate = function(input){

        var self = this,
            testToRun = $(input).attr('data-validation').split(';'),
            positionFn = (self.options.positionError == "before") ? "prepend" : "append" 

        $(testToRun).each(function(key, value){

            var validation = JSON.parse(value),
                validationName = validation.name,
                validationRegex = validation.regex,
                validationErrorMsg = validation.errorMsg,
                $parentInput = $(input).closest(self.options.parentInput),
                wrapId = $(input).attr('id')


               if(!validations[validationName](input,validationRegex,validationErrorMsg)){ // si la validation return false

                        // ADD CLASS ERROR 
                        if(!$parentInput.hasClass(self.options.errorClass)){ // et si le parent de l'elem n'a pas deja la class d'erreur, je l'ajoute

                            $(input)
                                .closest(self.options.parentInput)
                                .addClass(self.options.errorClass)
                         }

                        // ADD MESSAGE ERREUR

                        if(!self.options.errorSummary){ // cas sans erreur affichées en haut

                            if($parentInput.find('[data-error-name='+validationName+']').length == 0){ // si le message d'erreur n'existe pas déja je l'append
                                     
                                  $(input) 
                                      .closest(self.options.parentInput)
                                      [positionFn]('<'+self.options.errorTag+' class="'+self.options.errorMessageClass+'" data-error-name="'+validationName+'">'+validationErrorMsg+'</'+self.options.errorTag+'>')
                            }

                        }else{  // cas avec erreur affichée en haut

                            if($(self.options.errorContainer).find('[data-wrap-id='+wrapId+']').length == 0){

                                 $(self.options.errorContainer).append('<li data-wrap-id='+wrapId+'></li>')
                            }

                            var $wrapId = $(self.options.errorContainer).find('[data-wrap-id='+wrapId+']')
                           
                           if($wrapId.find('[data-error-name="'+validationName+'"]').length == 0){

                                 $wrapId
                                    [positionFn]('<'+self.options.errorContainerTag+' class='+self.options.errorContainerTagClass+' data-error-name="'+validationName+'">'+validationErrorMsg+'</'+self.options.errorContainerTag+'>')
                        } 
                    }

                    // CALLBACK => onErrorField

                    if(self.options.onErrorfield){
                        self.options.onErrorfield($(input))
                    }

            }else{ // si le champ est valide

                if(self.options.errorSummary){ // cas erreur en haut    
                        
                     var $wrapId = $(self.options.errorContainer).find('[data-wrap-id='+wrapId+']')

                     $wrapId
                        .find('[data-error-name='+validationName+']')
                        .remove()

                    if($wrapId.find('[data-error-name]').length == 0){

                        $parentInput.removeClass(self.options.errorClass)
                        $wrapId.remove()
                    }    

                }else{

                    $parentInput
                        .find('[data-error-name='+validationName+']')
                        .remove() 

                   if($parentInput.find('[data-error-name]').length == 0){
                        $parentInput.removeClass(self.options.errorClass)
                   } 
                }
            } 
        })
    };

    Plugin.prototype.isValid = function() {
        return !$('[required]:visible', this.element).closest(this.options.parentInput).hasClass(this.options.errorClass)
    };

    Plugin.prototype.init = function () {

        var self = this;

        // AU SUBMIT
        if(self.options.onSubmit){

            $(self.element).on('submit', function(event){ 

                $(self.element).find('[required]:visible').each(function(){
                    self.validate(this)
                })

                //Si erreur je lance onErrorSubmit
                if($(self.element).find('.'+self.options.errorClass+':visible').length > 0){

                    self.options.onErrorSubmit(self.element, event)

                 }else{ // si pas erreur

                    $(self.element).off('submit') // detruit le submit naturel

                    self.options.onSuccessSubmit(self.element, event)
                }
            })
        }

        if(self.options.onBlur){
          $(self.element).on('blur','input[required]:not([type="submit"]):not([type="radio"]):not([type="checkbox"]),textarea[required]', function(event){
                self.validate(this)
            })
        }

        if(self.options.onChange){
             $(self.element).on('change','select[required]:visible,[required][type="checkbox"]:visible, [required][type="radio"]:visible', function(event){
                self.validate(this)             
            })
         }
     
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

