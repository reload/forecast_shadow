var shadowJss = "/* Find all assignments & views. */\n" +
"function doShadow() {\n" +
"    var assignments = App.__container__.lookup('store:main').all('assignment');\n" +
"    var views = App.__container__.lookup('component:assignment-frame')._viewRegistry; \n" +
"    $.each(views, function (i, view) {\n" +
"        /* If the view is empty, or does not have a controller context, skip. */\n" +
"        if (view == null || view._controller == null || view._controller.model == null) {\n" +
"            return;\n" +
"        }\n" +
"\n" +
"        /* Get the id controller context model. */\n" +
"        var context_id = view._controller.model.id;\n" +
"        assignments.forEach(function (assignment) {\n" +
"            /* If the view, and the assignment share the same id, we got a match, else skip. */\n" +
"            if (assignment.id != context_id) {\n" +
"                return\n" +
"            }\n" +
"\n" +
"            /* Gray the assignment if the assignment note contains our keyword. */\n" +
"            if (assignment.get('notes') != null && assignment.get('notes').indexOf('#shadow') != -1 && $(view.element).is('div') && $(view.element).hasClass('assignment')) {\n" +
"                $(view.element).removeClass('gray orange red green aqua blue purple magenta');\n" +
"                $(view.element).addClass('gray');\n" +
"            }\n" +
"        });\n" +
"    });\n" +
"}\n" +
"/* Adding onClick handler only works when the element exists. This function makes sure the handler is not set, before" +
" * the control-button exists." +
"**/\n" +
"function viewportNavigationExists() {\n" +
"    if (jQuery('.control-button').length == 0) {\n" +
"        setTimeout(viewportNavigationExists, 500);\n" +
"    }\n" +
"    else {\n" +
"        jQuery('.control-button').click(function () { doShadow(); });\n" +
"        doShadow();\n" +
"    }\n" +
"}\n" +
"/* Add event handlers */\n" +
"jQuery(document).ready(function () { viewportNavigationExists(); });\n" +
"jQuery(window).click(function () { doShadow(); });\n" +
"jQuery(window).scroll(function () { doShadow(); });\n" +
"jQuery(window).keydown(function () { doShadow(); });\n" +
"jQuery(window).keyup(function () { doShadow(); });\n";

var script = document.createElement('script');
var code = document.createTextNode(shadowJss);
script.appendChild(code);
(document.body || document.head).appendChild(script);