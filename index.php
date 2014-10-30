<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 lt-ie10"> <![endif]-->
<!--[if IE 7]>         <html class="no-js ie7 lt-ie9 lt-ie8 lt-ie10"> <![endif]-->
<!--[if IE 8]>         <html class="no-js ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]>         <html class="no-js ie9 lt-ie10"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>VALIDATHOR</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
           
        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

       <link href='http://fonts.googleapis.com/css?family=Oranienbaum' rel='stylesheet' type='text/css'>
      
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/modernizr/modernizr-2.6.2.min.js"></script>
    </head>

<body>
    <div class="error-block"></div>
    <div class="size1of2 center">
        <h1 class="h1">VALIDATHOR</h1>
        <form id="form1" action="#" method="post" class="form" novalidate='novalidate'>   
           
            <div class="row" data-parent='field'>
                    <label class="label">Nom</label><!--
                --><input type="text" required='required'  data-error-message='ne peut etre vide' data-validation='empty'>
            </div>
        
            <div class="row" data-parent='field'>
                    <label class="label">Code postal</label><!--
                --><input type="text" required='required' data-error-message='doit etre un code postal' data-validation='postCode'>
            </div> 

            <div class="row">
                <input type="submit" value="Submit">
            </div>
        </form>

        <form id="form2" action="#" method="post" class="form" novalidate='novalidate'>   
            <div class="row" data-parent='field'>
                    <label class="label">Nom</label><!--
                --><input type="text" required='required'  data-error-message='ne peut etre vide' data-validation='empty'>
            </div>
        
            <div class="row" data-parent='field'>
                    <label class="label">Code postal</label><!--
                --><input type="text" required='required' data-error-message='doit etre un code postal' data-validation='postCode'>
            </div> 

            <div class="row">
                <input type="submit" value="Submit">
            </div>
        </form>

    </div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
 
    <script src="js/libs.js"></script>
    <script src="js/main.js"></script>

    <script>


$(document).ready(function(){

$("#form1").validathor({
        parentInput : '[data-parent="field"]',
        errorClass : 'error',
        errorMessageClass : 'error-message',
        requiredClass : '[required]',
        errorSummary: false,
        summaryEl:'.error-block',
        summaryElTag : 'span',
        summaryElTagClass: 'fds',
        onErrorSubmit : function(form,event){
            /*AU SUBMIT, si il y a une erreur, on entre dans ce callback*/
            event.preventDefault()

            console.log('error form1')
          
        },
        onSuccessSubmit : function(form,event){
            /*AU SUBMIT, si la validation est bonne, on entre dans ce callback*/
          event.preventDefault()
            alert("succeess")
        },
        onErrorfield : function(){
            /*callback généré pour chaque erreur mis sur un input*/
    
        }
    })

var validathor = $("#form1").data('validathor')
console.log(validathor)

$('h1').on('click', function(){
    $('#form1').find('[required]').each(function(){
         validathor.validate(this)
         console.log( validathor.isValid())
    })
})

$("#form2").validathor({
        parentInput : '[data-parent="field"]',
        errorClass : 'error',
        errorMessageClass : 'error-message',
        requiredClass : '[required]',
        errorSummary: false,
        summaryEl:'.error-block',
        summaryElTag : 'span',
        summaryElTagClass: 'fds',
        onErrorSubmit : function(form,event){
            /*AU SUBMIT, si il y a une erreur, on entre dans ce callback*/
            event.preventDefault()
            console.log('error form2')
          
        },
        onSuccessSubmit : function(form,event){
            /*AU SUBMIT, si la validation est bonne, on entre dans ce callback*/
             event.preventDefault()
            alert("succeess")
        },
        onErrorfield : function(){
            /*callback généré pour chaque erreur mis sur un input*/
    
        }
    })
})

</script>
</body>
</html>
