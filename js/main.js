
$(document).ready(function(){
    if (typeof SyntaxHighlighter != "undefined") {
          SyntaxHighlighter.all();
    }

    if(jQuery().validaThor){
        
         $("#form1").validaThor({
            parentInput : '[data-parent="field"]',
            errorClass : 'error',
            errorMessageClass : 'error-message',
            requiredClass : '[required]',
            errorSummary: false,
            summaryEl:'.error-block',
            summaryElTag : 'span',
            summaryElTagClass: 'error-line',
            onErrorSubmit : function(form,event){
                /*AU SUBMIT, si il y a une erreur, on entre dans ce callback*/
                event.preventDefault()
            },
            onSuccessSubmit : function(form,event){
                /*AU SUBMIT, si la validation est bonne, on entre dans ce callback*/  
               submitForm(form)
            },
            onErrorfield : function(){
                /*callback généré pour chaque erreur mis sur un input*/
            }
        })

    
         function submitForm(form){
            form.submit()
         }

        $("#form2").validaThor({
            parentInput : '[data-parent="field"]',
            errorClass : 'error',
            errorMessageClass : 'error-message',
            requiredClass : '[required]',
            errorSummary: false,
            summaryEl:'.error-block',
            summaryElTag : 'span',
            summaryElTagClass: 'error-line',
            onErrorSubmit : function(form,event){
                /*AU SUBMIT, si il y a une erreur, on entre dans ce callback*/
                event.preventDefault()
            },
            onSuccessSubmit : function(form,event){
                /*AU SUBMIT, si la validation est bonne, on entre dans ce callback*/
                 event.preventDefault()
            },
            onErrorfield : function(){
                /*callback généré pour chaque erreur mis sur un input*/
        
            }
        })
        
       // Validation externe 
        
        var validathor = $("#form1").data('validaThor') 

        $('.ext-validate').on('click', function(e){
            e.preventDefault()
            $('#form1').find('[required]').each(function(){
                 validathor.validate(this)
         
            })

        })

    }
})

