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
        <link href='http://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'>

        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/styles/default.min.css">
      
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/main.css">

    </head>

<body>
    <div id="page" class="pb-2 pt-2">
        <header class="row mb-2">
            <div class="region w-d100">
                <h1 class="fs-xxl ta-center">Validathor - How to</h1>
            </div>
        </header>
        <main id="main">
            <ol class="ls-num">
                <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="mb-1 fs-m">Présentation</h2>
                        </header>
                         <p class="mb-1">Validathor est un plugin jQuery qui permet une validation de formulaire côté client automatique et configurable.</p>
                         <p class="mb-1">Le plugin permet une validation sur les event 'blur' pour les champ de type input et textarea, 'change' pour les selec, radio et checkbox, et 'submit' sur le form lui même.</p>
                        <p class="mb-1">Le plugin permet d'utilsier les différent type d'input html5, il sont dépourvu de leur validation native mais ffiche toujours le bon clavier sur les différents device  </p>
                    </section>
                </li>
                <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="mb-1 fs-m">Charger jQuery et validathor.js</h2>
                        </header>
                         <p class="mb-1">Pour utiliser le validaThor, jQuery est requis (minimum 1.8)</p>
                    </section>
                </li>
                <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="fs-m mb-1">Le html minimum</h2>
                        </header>
                        <div class="row">
                            <p class="mb-1">Nous avons besoin du markup suivant:</p>
                             <script type="syntaxhighlighter" class="brush: xml"><![CDATA[
                                <form id="mon-form" action="#" method="post" novalidate='novalidate'>
                                    <div data-parent='field'>
                                        <label>Nom</label>
                                        <input type="text" required='required' data-error-message='ne peut etre vide' data-validation='empty'>
                                    </div>

                                    <div data-parent='field'>
                                        <label>Code postal</label>
                                        <input type="text" required='required' data-error-message='doit etre un code postal' data-validation='postCode'>
                                    </div> 
                                </form>
                            ]]></script>
                            <ul>
                                <li class="mb-1"><p>Sur la balise form, il faut un id ou class à passer au plugin pour l'instancier, et un attribut novalidate='novlidate' pour bloquer la vérif native HTML5 </p></li>
                                <li class="mb-1">
                                    <p class="mb-1">Chaque input doit être wrappé dans un élément générique commun, ici un "div data-parent='field'" (c'est l'élément dans lequel dans va être append l'erreur)</p>
                                    <p>Chaque input doit avoir: </p>
                                        <ul class="ml-1 square">
                                            <li><p>Un attribut <span>required="required"</span>, pour signifier au plugin que l'element en question doit etre validé</p></li>
                                            <li><p>Un attribut <span>data-validation="validation"</span>, pour signifier au plugin quel validation il doit appliqué à l'élément</p></li>
                                            <li><p>Un attribut <span>data-error-message="mon message"</span>, pour signifier au plugin quel message d'erreur il doit affiché pour cette validation</p></li>
                                        </ul>
                                    
                                </li>
                            </ul>
                        </div>
                    </section>
                </li>
                 <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="fs-m mb-1">Instantiation du plugin</h2>
                        </header>
                         <p>Au document ready, il n'y a plus qu'à appeller :</p>
                          <script type="syntaxhighlighter" class="brush: js"><![CDATA[
                                $(document).ready(function(){
                                    $("#form").validaThor()
                                })
                            ]]></script>
                    </section>
                </li>
                <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="fs-m mb-1">Configuration des validations</h2>
                        </header>
                        <p class="mb-1">Les data-validation se configurent dans l'objet validations. <br/> 
                        La première entrée correspond au type de champs (text, tel, checkbox, etc...) et l'entrée suivante à la validation elle-même</p>

                        <p class="mb-1">Pour valider un input de type nous avons a disposition la validation empty et email par exemple.</p>
                        <p>Si nous voulons créer la validation "empty" pour un champs de type "tel", il faudra créer une entrée "tel" et créer la validation empty dans cette entrée. </p>
                        <p class="mb-1">Chaque validation exécute une fonction process() qui retourne un booléen. <br/>
                            Si la process() retourne false, l'élement se voit ajouter une class d'erreur</p>
                        <p class="mb-1">La fonction process() prend deux permet params: l'input courant et la validation associée</p>
          
                        <script type="syntaxhighlighter" class="brush: js">

                            <![CDATA[

                                regEx = { // obj contenant les regex
                                    email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    postCode : /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
                                    phone : /^0[1-6]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/
                                },

                                validations = {
                                    // type del'élement, ici input type text
                                    "text" : {
                                        "empty" : { // nom de la validation
                                            process : function(input,validationType){ // fonction executé avec en argument l'élément 
                                                                                      // courant et le nom de la validation
                                                return !input.val() == ""
                                            },
                                            errorMessage : function(input){ 
                                                return $(input).data('error-message')
                                            }
                                        },
                                    },
                                    "email" : {
                                            process : function(input,validationType){
                                                // validation via regex, dans ce cas la regex doit avoir 
                                                //le meme nom que la validation, et ajouté a l objet regex, ci dessus
                                                return regEx[validationType].test(input.val())){
                                                  
                                            },
                                            errorMessage : function(input){
                                                return $(input).data('error-message')
                                            }    
                                    },
                                    "checkbox" : { // type del'élement, ici input type checkbox
                                        "checked" :{ // type del'élement, ici input type checkbox
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
                                    }
                            ]]>
                        </script>
                    </section>
                </li>
                 <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="fs-m mb-1">Gestion des erreurs</h2>
                        </header>
                        <p class="mb-1">Par défaut les erreurs sont append dans le parent de l'élément validé.</p>
                        <p class="mb-1">Un autre mode de gestion d'erreur est disponible via l'option errorSummary,
                        qui permet d'afficher les erreurs dans un bloc 
                        particulier. Ce bloc doit être présents dans le markup à l'instanciation du plugin. </p>
                        <script type="syntaxhighlighter" class="brush: js">
                            <![CDATA[
                                   parentInput : "[data-parent='field']", // identifiant de la div parente de chaque input
                                   errorClass : "error", // class css ajoutée si erreur
                                   errorMessageClass : "error-message", // class css ajoutée au message d'erreur
                                   requiredClass : "[required]", // chaque input doit avoir cette attribut pour être validé
                                   errorSummary: false, // déclenche le mode affichage des erreurs dans un bloc commun
                                   summaryEl:".error-block", // identifiant du bloc dans lequel les erreurs sont inscrites
                                   summaryElTag : "span", // element dans lequel sont append les erreur en mode errorSummary
                                   summaryElTagClass: "error-line", // class ajouté sur l'element summaryElTag
                                   onErrorSubmit : null, // callback declenché si le formulaire est invalid au submit
                                   onSuccessSubmit : null,// callback declenché si le formulaire est valid au submit
                                   onErrorfield : null // callback declenché pour chaque erreur ajoutée
                            ]]>
                        </script>
                    </section>
                </li>
                 <li class="mb-2">
                    <section class="region w-d100">
                        <header>
                            <h2 class="fs-m mb-1">API + callbacks</h2>
                        </header>
                        <p class="mb-1">Plusieurs callback sont disponibles :</p>
                       
                            <script type="syntaxhighlighter" class="brush: js">
                                <![CDATA[
                                       onErrorSubmit : function(){}, // callback declenché si le formulaire est invalid au submit
                                       onSuccessSubmit : function(){},// callback declenché si le formulaire est valid au submit
                                       onErrorfield : function(){} // callback declenché pour chaque erreur ajoutée
                                ]]>
                            </script>
                             <p class="mb-1">Attention le 'submit' est déjà bindé et il lance  onSuccessSubmit(), il n'est donc aps nécessaire de re submiter le form dans ce callback </p>
                              <script type="syntaxhighlighter" class="brush: js">
                                <![CDATA[
                                       onSuccessSubmit : function(form, event){
                                            form.submit() // le form sera donc submiter au submit... inutile
                                       }
                                ]]>
                            </script>
                            <p class="mb-1">Pour accéder aux méthodes du validaThor depuis l'extérieur il faut stocker l'instance: </p>

                            <script type="syntaxhighlighter" class="brush: js">
                                <![CDATA[   
                                    var validObj = $("#form1").data('validaThor') 
                                ]]>
                            </script>

                            <p>On peut accéder aux méthodes isValid() qui retourne un un boolean, en fonction de la présence d'erruer ou nom</p>
                            <p>On peut également accéder à la méthode validate(), qui permet de lancer une validation sur un click par exemple, ou autre event. </p>
                           
                            <script type="syntaxhighlighter" class="brush: js">
                                <![CDATA[   
                                    $('button').on('click', function(){
                                        $('#form1').find('[required]').each(function(){
                                             validObj.validate(this)  


                                             if(validObj.isValid()){ // booléen : présence d'erreur ou pas
                                                console.log("le formulaire a passé la validation avec succès")
                                             }else{
                                                console.log("le formulaire comporte des erreurs")
                                             }
                                        })
                                    })
                                ]]>
                            </script>
                    </section>
                </li>
                
            </ol>
        </main>
    </div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/highlight.min.js"></script>
 
    <script src="js/libs.js"></script>
    <script src="js/main.js"></script>
    
    
</body>
</html>
