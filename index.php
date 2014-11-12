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

     
    </head>

<body>

    <div class="error-block"></div>

    <section id="page">
        <header>
            <h1 class="fs-xl ta-center pt-2 pb-2">VALIDATHOR</h1>
        </header>
        <div class="form-container">
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
                    <button> Envoie </button>
                 
                </div>
            </form>
        </div>
        <div class="form-container">
            <form id="form2" action="#" method="post" class="form" novalidate='novalidate'>   
                <div class="row" data-parent='field'>
                        <label class="label">Nom</label><!--
                    --><input type="text" required='required'  data-error-message='ne peut etre vide' data-validation='empty'>
                </div>
            
                <div class="row" data-parent='field'>
                        <label class="label">Code postal</label><!--
                    --><input type="text" required='required' data-error-message='doit etre un code postal' data-validation='postCode'>
                </div> 
                <div class="row" data-parent='field'>
                        <label class="label">Code postal</label><!--
                    --><select type="text" required='required' data-error-message='le select doit etre rempli' data-validation='selected'>
                            <option value="0">Choisissez une valeur</option>
                            <option  value="2">2</option>
                            <option  value="3">3</option>
                            <option  value="4">4</option>
                            <option  value="5">5</option>
                        </select>
                </div> 
                <div class="row radio-group" data-parent='field'>
                    <div class="custom-radio">
                        <input id="choice-1" required="required"  data-error-message="vous devez choisir une option"  data-validation='checked' name="choice" type="radio">
                        <label for="choice-1" >choix 1</label>
                      </div>
                      <div class="custom-radio">
                        <input id="choice-2"  required="required"  data-error-message="vous devez choisir une option"  data-validation='checked' name="choice" type="radio">
                        <label for="choice-2" >choix 2</label>
                      </div>
                </div> 

                    <div class="custom-checkbox row" data-parent="field">
                        <input id="check-1" required="required"  data-error-message="vous devez choisir une option"  data-validation='checked' name="check" type="checkbox">
                        <label for="check-1">choix 1</label>
                    </div>

                <div class="row">
                     <button> Envoie </button>
                </div>
            </form>
        </div>

        <a href="#" class="ext-validate">Validez le premier formulaire !</a>

    </section>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
 
    <script src="js/validathor.js"></script>
    <script src="js/main.js"></script>


</body>
</html>
