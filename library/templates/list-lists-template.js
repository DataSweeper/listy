(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['list-lists-template.handlebarse'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "   <tr>\n    <td><div class=\"list-list\" id=\""
    + alias3(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" style=\"cursor: pointer;\">\n    <table><tr><td><img src=\""
    + alias3((helpers.twitterImg || (depth0 && depth0.twitterImg) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.profile_image_url_https : stack1),{"name":"twitterImg","hash":{},"data":data}))
    + "\" width=\"50\" height=\"50\"/></td> <td><h1>"
    + alias3(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"slug","hash":{},"data":data}) : helper)))
    + "</h1></td></tr></table>\n    </div></td>\n   <td> <input type=\"checkbox\" value=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id=\"checklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.ischecked : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "/></td></tr>\n";
},"2":function(depth0,helpers,partials,data) {
    return " checked ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table>\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</table>\n";
},"useData":true});
})();