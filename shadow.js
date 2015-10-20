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
"            if (assignment.get('notes') != null && assignment.get('notes').indexOf('#skygge') != -1 && $(view.element).is('div') && $(view.element).hasClass('assignment')) {\n" +
"                $(view.element).removeClass('gray orange red green aqua');\n" +
"                $(view.element).addClass('gray');\n" +
"            }\n" +
"        });\n" +
"    });\n" +
"    setTimeout(doShadow, 250);\n" +
"}\n" +
"jQuery(document).ready(function () { doShadow(); });";

var script = document.createElement('script');
var code = document.createTextNode(shadowJss);
script.appendChild(code);
(document.body || document.head).appendChild(script);