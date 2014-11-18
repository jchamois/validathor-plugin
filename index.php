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
        <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:700' rel='stylesheet' type='text/css'>

        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/modernizr/modernizr-2.6.2.min.js"></script>
    </head>
    <body class="va-center-mid ta-center"><!-- 
    --><section id="page"class="pb-2 pt-2 ta-left w-d100 d-iblock va-mid">
        <header class="row mb-2">
            <div class="region w-d100">
                <h1 class="fs-xxl ta-center">VALIDATHOR</h1>
            </div>
        </header>

        <main id="main" class="region w-d100">
            <div class="form-container">
                <form id="form" action="#" method="post" class="form" novalidate='novalidate'>   
                    <div class="row mt-1 p-1" data-parent='field'>
                        <label class="label">Nom</label><!--
                        --><input class="w-d33" id="test" type="text" required='required' data-validation='{"name":"pattern",
                                                                                                            "regex":"email",
                                                                                                            "errorMsg":"Email invalide"
                                                                                                            };
                                                                                                            {"name":"emptyInput",
                                                                                                            "errorMsg":"Ne doit pas etre vide "
                                                                                                            }'>
                    </div>
                
                    <div class="row mt-1 p-1" data-parent='field'>
                            <label class="label">Telephone</label><!--
                        --><input class="w-d33" type="text" required='required'  data-validation='{"name":"pattern",
                                                                                "regex":"phone",
                                                                                "errorMsg":"Telephone invalide"
                                                                                };
                                                                                {"name":"emptyInput",
                                                                                "errorMsg":"Ne doit pas etre vide "
                                                                                }'>
                    </div> 

                    <div class="row mt-1 p-1">
                        <button type="submit"  class="button submit">J'envoie</button>
                    </div>
                </form>

                <form id="form-m" action="#" method="post" class="form" novalidate='novalidate'>   
                      <div class="row mt-1 p-1" data-parent='field'>
                            <label class="label">Nom</label><!--
                        --><input class="w-d33" id="test" type="text" required='required' data-validation='{"name":"pattern",
                                                                                                            "regex":"email",
                                                                                                            "errorMsg":"Email invalide"
                                                                                                            };
                                                                                                            {"name":"emptyInput",
                                                                                                            "errorMsg":"Ne doit pas etre vide "
                                                                                                            }'>
                    </div>
                
                    <div class="row mt-1 p-1" data-parent='field'>
                            <label class="label">Telephone</label><!--
                        --><input class="w-d33" type="text" required='required'  data-validation='{"name":"pattern",
                                                                                "regex":"phone",
                                                                                "errorMsg":"Telephone invalide"
                                                                                }'>
                    </div>

                    <div class="row mt-1 p-1">
                        <button type="submit"  class="button submit">J'envoie</button>
                    </div>
                </form>
            </div>
        </main>
    </section>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/validathor.js"></script>
    <script>
        $(document).ready(function(){
      

            $("#form").validaThor({
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
                    },
                    onSuccessSubmit : function(form,event){
                        /*AU SUBMIT, si la validation est bonne, on entre dans ce callback*/
                        
                        alert("succeess")
                    },
                    onErrorfield : function(){
                        /*callback généré pour chaque erreur mis sur un input*/
                
                    }
                })

            $("#form-m").validaThor({
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
                    },
                    onSuccessSubmit : function(form,event){
                        /*AU SUBMIT, si la validation est bonne, on entre dans ce callback*/
                
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
