var shadowJss =
" /* Find all assignments & views. */ \n" +
"function doShadow() {\n" +
    "var forecastUrl = 'forecastapp.com';\n" +
    "if (jQuery('body').hasClass('ember-application') && (window.location.href.indexOf(forecastUrl) > -1 )) {\n" +

    "$('.ember-view').each(function() {\n" +
            "/* Gray the assignment if the assignment title contains our keyword. */\n" +
            "if (jQuery($(this)).is('div') && jQuery($(this)).hasClass('assignment') && jQuery($(this)).hasClass('has-notes')) {\n" +
                "jQuery($(this)).removeClass('gray orange red green aqua blue purple magenta');\n" +
                "jQuery($(this)).addClass('gray');\n" +
            "};\n" +
        "});\n" +
        "}\n" +
"}\n" +
"/**\n" +
" * Adding onClick handler only works when the element exists.\n" +
" * This function makes sure the handler is not set, before +\n" +
" * the control-button exists.\n" +
" */\n" +
"function viewportNavigationExists() {\n" +
    "if (jQuery('.row-expand-icon').length == 0) {\n" +
        "setTimeout(viewportNavigationExists, 800);\n" +
    "}\n" +
    "else {\n" +
        "jQuery('.row-expand-icon').click(function () {\n" +
            "doShadow();\n" +
        "});\n" +
        "doShadow();\n" +
    "}\n" +
"}\n" +
"/* Add event handlers */\n" +
"jQuery(document).ready(function () {\n" +
    "viewportNavigationExists();\n" +
"});\n" +
"jQuery(window).click(function () {\n" +
    "doShadow();\n" +
"});\n" +
"jQuery(window).scroll(function () {\n" +
    "doShadow();\n" +
"});\n" +
"jQuery(window).keydown(function () {\n" +
    "doShadow();\n" +
"});\n" +
"jQuery(window).keyup(function () {\n" +
    "doShadow();\n" +
"});\n";


var jq = document.createElement('script');
jq.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
(document.body || document.head).appendChild(jq);

var script = document.createElement('script');
var code = document.createTextNode(shadowJss);
script.appendChild(code);
(document.body || document.head).appendChild(script);