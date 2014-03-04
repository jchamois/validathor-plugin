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
    <div class="size1of2 center">
        <h1 class="h1">VALIDATHOR</h1>

        <form action="#" method="post" class="form ">   
            <div class="row ">
                    <label class="label">Nom</label><!--
                --><input type="text" class="required" data-validation='empty'>
            </div>
            <div class="row ">
                    <label class="label">Email</label><!--
                --><input type="text" class="required" data-validation="empty,email">
            </div> 
            <div class="row ">
                    <label class="label">Téléphone</label><!--
                --><input type="text" class="required" data-validation="empty,phone">
            </div> 

            <div class="row ">
                    <label class="label">Code postal</label><!--
                --><input type="text" class="required" data-validation="empty,postCode">
            </div> 

            <!-- CHECKBOX -->

            <h3 class="h3">Checkbox</h3>

            <div class="row custom-checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" class="required" data-validation="checked" />
                <label for="checkbox">Etes vous un etre humain ?</label>
            </div>

            <div class="radio-group row">
                <div class=" custom-radio">
                    <input type="radio" name="radio-choice" id="male" value="male" class="required" data-validation="checked" />
                    <label for="male">Homme</label> 
                </div>
                <div class=" custom-radio">
                    <input type="radio" name="radio-choice" id="female"  value="female" class="required"  data-validation="checked" />
                    <label for="female">Femme</label>
                </div>
            </div> 

            <div class="row"> 
                <label for="select" class="label">Select Choice: *</label>
                <div class="custom-select">
                    <select class="required" data-validation="selected">
                        <option value="0">Activité*</option>
                        <option value="tic">TIC</option>
                        <option value="2">1</option>
                        <option value="3">1</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <input type="submit" value="Submit">
            </div>
        </form>

    </div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
 
    <script src="js/libs.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
