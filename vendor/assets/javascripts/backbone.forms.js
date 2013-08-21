(function(e){if(typeof exports!="undefined"&&typeof require!="undefined")var t=e.jQuery||e.Zepto||e.ender||require("jquery"),n=e._||require("underscore"),r=e.Backbone||require("backbone");else var t=e.jQuery,n=e._,r=e.Backbone;var i=r.View.extend({initialize:function(e){var t=this;e=e||{};var r=this.schema=function(){if(e.schema)return n.result(e,"schema");var r=e.model;return r&&r.schema?n.isFunction(r.schema)?r.schema():r.schema:t.schema?n.isFunction(t.schema)?t.schema():t.schema:{}}();n.extend(this,n.pick(e,"model","data","idPrefix"));var i=this.constructor;this.template=e.template||i.template,this.Fieldset=e.Fieldset||i.Fieldset,this.Field=e.Field||i.Field,this.NestedField=e.NestedField||i.NestedField;var s=this.selectedFields=e.fields||n.keys(r),o=this.fields={};n.each(s,function(e){var t=r[e];o[e]=this.createField(e,t)},this);var u=e.fieldsets||[s],a=this.fieldsets=[];n.each(u,function(e){this.fieldsets.push(this.createFieldset(e))},this)},createFieldset:function(e){var t={schema:e,fields:this.fields};return new this.Fieldset(t)},createField:function(e,t){var n={form:this,key:e,schema:t,idPrefix:this.idPrefix};this.model?n.model=this.model:this.data?n.value=this.data[e]:n.value=null;var r=new this.Field(n);return this.listenTo(r.editor,"all",this.handleEditorEvent),r},handleEditorEvent:function(e,t){var r=t.key+":"+e;this.trigger.call(this,r,this,t);switch(e){case"change":this.trigger("change",this);break;case"focus":this.hasFocus||this.trigger("focus",this);break;case"blur":if(this.hasFocus){var i=this;setTimeout(function(){var e=n.find(i.fields,function(e){return e.editor.hasFocus});e||i.trigger("blur",i)},0)}}},render:function(){var e=this,r=this.fields,i=t(t.trim(this.template(n.result(this,"templateData"))));return i.find("[data-editors]").add(i).each(function(i,s){var o=t(s),u=o.attr("data-editors");if(n.isUndefined(u))return;var a=u=="*"?e.selectedFields||n.keys(r):u.split(",");n.each(a,function(e){var t=r[e];o.append(t.editor.render().el)})}),i.find("[data-fields]").add(i).each(function(i,s){var o=t(s),u=o.attr("data-fields");if(n.isUndefined(u))return;var a=u=="*"?e.selectedFields||n.keys(r):u.split(",");n.each(a,function(e){var t=r[e];o.append(t.render().el)})}),i.find("[data-fieldsets]").add(i).each(function(r,i){var s=t(i),o=s.attr("data-fieldsets");if(n.isUndefined(o))return;n.each(e.fieldsets,function(e){s.append(e.render().el)})}),this.setElement(i),i.addClass(this.className),this},validate:function(){var e=this,t=this.fields,r=this.model,i={};n.each(t,function(e){var t=e.validate();t&&(i[e.key]=t)});if(r&&r.validate){var s=r.validate(this.getValue());if(s){var o=n.isObject(s)&&!n.isArray(s);o||(i._others=i._others||[],i._others.push(s)),o&&n.each(s,function(e,n){if(t[n]&&!i[n])t[n].setError(e),i[n]=e;else{i._others=i._others||[];var r={};r[n]=e,i._others.push(r)}})}}return n.isEmpty(i)?null:i},commit:function(e){var t=this.validate();if(t)return t;var r,i=n.extend({error:function(e,t){r=t}},e);this.model.set(this.getValue(),i);if(r)return r},getValue:function(e){if(e)return this.fields[e].getValue();var t={};return n.each(this.fields,function(e){t[e.key]=e.getValue()}),t},setValue:function(e,t){var n={};typeof e=="string"?n[e]=t:n=e;var r;for(r in this.schema)n[r]!==undefined&&this.fields[r].setValue(n[r])},getEditor:function(e){var t=this.fields[e];if(!t)throw"Field not found: "+e;return t.editor},focus:function(){if(this.hasFocus)return;var e=this.fieldsets[0],t=e.getFieldAt(0);if(!t)return;t.editor.focus()},blur:function(){if(!this.hasFocus)return;var e=n.find(this.fields,function(e){return e.editor.hasFocus});e&&e.editor.blur()},trigger:function(e){return e==="focus"?this.hasFocus=!0:e==="blur"&&(this.hasFocus=!1),r.View.prototype.trigger.apply(this,arguments)},remove:function(){return n.each(this.fieldsets,function(e){e.remove()}),n.each(this.fields,function(e){e.remove()}),r.View.prototype.remove.apply(this,arguments)}},{template:n.template("    <form data-fieldsets></form>  ",null,this.templateSettings),templateSettings:{evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},editors:{}});i.validators=function(){var e={};return e.errMessages={required:"Required",regexp:"Invalid",email:"Invalid email address",url:"Invalid URL",match:n.template('Must match field "<%= field %>"',null,i.templateSettings)},e.required=function(e){return e=n.extend({type:"required",message:this.errMessages.required},e),function(r){e.value=r;var i={type:e.type,message:n.isFunction(e.message)?e.message(e):e.message};if(r===null||r===undefined||r===!1||r==="")return i}},e.regexp=function(e){if(!e.regexp)throw new Error('Missing required "regexp" option for "regexp" validator');return e=n.extend({type:"regexp",message:this.errMessages.regexp},e),function(r){e.value=r;var i={type:e.type,message:n.isFunction(e.message)?e.message(e):e.message};if(r===null||r===undefined||r==="")return;if(!e.regexp.test(r))return i}},e.email=function(t){return t=n.extend({type:"email",message:this.errMessages.email,regexp:/^[\w\-]{1,}([\w\-\+.]{1,1}[\w\-]{1,}){0,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/},t),e.regexp(t)},e.url=function(t){return t=n.extend({type:"url",message:this.errMessages.url,regexp:/^(http|https):\/\/(([A-Z0-9][A-Z0-9_\-]*)(\.[A-Z0-9][A-Z0-9_\-]*)+)(:(\d+))?\/?/i},t),e.regexp(t)},e.match=function(e){if(!e.field)throw new Error('Missing required "field" options for "match" validator');return e=n.extend({type:"match",message:this.errMessages.match},e),function(r,i){e.value=r;var s={type:e.type,message:n.isFunction(e.message)?e.message(e):e.message};if(r===null||r===undefined||r==="")return;if(r!==i[e.field])return s}},e}(),i.Fieldset=r.View.extend({initialize:function(e){e=e||{};var t=this.schema=this.createSchema(e.schema);this.fields=n.pick(e.fields,t.fields),this.template=e.template||this.constructor.template},createSchema:function(e){return n.isArray(e)&&(e={fields:e}),e.legend=e.legend||null,e},getFieldAt:function(e){var t=this.schema.fields[e];return this.fields[t]},templateData:function(){return this.schema},render:function(){var e=this.schema,r=this.fields,i=t(t.trim(this.template(n.result(this,"templateData"))));return i.find("[data-fields]").add(i).each(function(e,i){var s=t(i),o=s.attr("data-fields");if(n.isUndefined(o))return;n.each(r,function(e){s.append(e.render().el)})}),this.setElement(i),this},remove:function(){n.each(this.fields,function(e){e.remove()}),r.View.prototype.remove.call(this)}},{template:n.template("    <fieldset data-fields>      <% if (legend) { %>        <legend><%= legend %></legend>      <% } %>    </fieldset>  ",null,i.templateSettings)}),i.Field=r.View.extend({initialize:function(e){e=e||{},n.extend(this,n.pick(e,"form","key","model","value","idPrefix"));var t=this.schema=this.createSchema(e.schema);this.template=e.template||t.template||this.constructor.template,this.errorClassName=e.errorClassName||this.constructor.errorClassName,this.editor=this.createEditor()},createSchema:function(e){return n.isString(e)&&(e={type:e}),e=n.extend({type:"Text",title:this.createTitle()},e),e.type=n.isString(e.type)?i.editors[e.type]:e.type,e},createEditor:function(){var e=n.extend(n.pick(this,"schema","form","key","model","value"),{id:this.createEditorId()}),t=this.schema.type;return new t(e)},createEditorId:function(){var e=this.idPrefix,t=this.key;return t=t.replace(/\./g,"_"),n.isString(e)||n.isNumber(e)?e+t:n.isNull(e)?t:this.model?this.model.cid+"_"+t:t},createTitle:function(){var e=this.key;return e=e.replace(/([A-Z])/g," $1"),e=e.replace(/^./,function(e){return e.toUpperCase()}),e},templateData:function(){var e=this.schema;return{help:e.help||"",title:e.title,fieldAttrs:e.fieldAttrs,editorAttrs:e.editorAttrs,key:this.key,editorId:this.editor.id}},render:function(){var e=this.schema,r=this.editor;if(e.type==i.editors.Hidden)return this.setElement(r.render().el);var s=t(t.trim(this.template(n.result(this,"templateData"))));return e.fieldClass&&s.addClass(e.fieldClass),e.fieldAttrs&&s.attr(e.fieldAttrs),s.find("[data-editor]").add(s).each(function(e,i){var s=t(i),o=s.attr("data-editor");if(n.isUndefined(o))return;s.append(r.render().el)}),this.setElement(s),this},validate:function(){var e=this.editor.validate();return e?this.setError(e.message):this.clearError(),e},setError:function(e){if(this.editor.hasNestedForm)return;this.$el.addClass(this.errorClassName),this.$("[data-error]").html(e)},clearError:function(){this.$el.removeClass(this.errorClassName),this.$("[data-error]").empty()},commit:function(){return this.editor.commit()},getValue:function(){return this.editor.getValue()},setValue:function(e){this.editor.setValue(e)},focus:function(){this.editor.focus()},blur:function(){this.editor.blur()},remove:function(){this.editor.remove(),r.View.prototype.remove.call(this)}},{template:n.template('    <div>      <label for="<%= editorId %>"><%= title %></label>      <div>        <span data-editor></span>        <div data-error></div>        <div><%= help %></div>      </div>    </div>  ',null,i.templateSettings),errorClassName:"error"}),i.NestedField=i.Field.extend({template:n.template(t.trim("    <div>      <span data-editor></span>      <% if (help) { %>        <div><%= help %></div>      <% } %>      <div data-error></div>    </div>  "),null,i.templateSettings)}),i.Editor=i.editors.Base=r.View.extend({defaultValue:null,hasFocus:!1,initialize:function(e){var e=e||{};if(e.model){if(!e.key)throw"Missing option: 'key'";this.model=e.model,this.value=this.model.get(e.key)}else e.value!==undefined&&(this.value=e.value);this.value===undefined&&(this.value=this.defaultValue),n.extend(this,n.pick(e,"key","form"));var t=this.schema=e.schema||{};this.validators=e.validators||t.validators,this.$el.attr("id",this.id),this.$el.attr("name",this.getName()),t.editorClass&&this.$el.addClass(t.editorClass),t.editorAttrs&&this.$el.attr(t.editorAttrs)},getName:function(){var e=this.key||"";return e.replace(/\./g,"_")},getValue:function(){return this.value},setValue:function(e){this.value=e},focus:function(){throw"Not implemented"},blur:function(){throw"Not implemented"},commit:function(e){var t=this.validate();if(t)return t;this.listenTo(this.model,"invalid",function(e,n){t=n}),this.model.set(this.key,this.getValue(),e);if(t)return t},validate:function(){var e=this.$el,t=null,r=this.getValue(),i=this.form?this.form.getValue():{},s=this.validators,o=this.getValidator;return s&&n.every(s,function(e){return t=o(e)(r,i),t?!1:!0}),t},trigger:function(e){return e==="focus"?this.hasFocus=!0:e==="blur"&&(this.hasFocus=!1),r.View.prototype.trigger.apply(this,arguments)},getValidator:function(e){var t=i.validators;if(n.isRegExp(e))return t.regexp({regexp:e});if(n.isString(e)){if(!t[e])throw new Error('Validator "'+e+'" not found');return t[e]()}if(n.isFunction(e))return e;if(n.isObject(e)&&e.type){var r=e;return t[r.type](r)}throw new Error("Invalid validator: "+e)}}),i.editors.Text=i.Editor.extend({tagName:"input",defaultValue:"",previousValue:"",events:{keyup:"determineChange",keypress:function(e){var t=this;setTimeout(function(){t.determineChange()},0)},select:function(e){this.trigger("select",this)},focus:function(e){this.trigger("focus",this)},blur:function(e){this.trigger("blur",this)}},initialize:function(e){i.editors.Base.prototype.initialize.call(this,e);var t=this.schema,n="text";t&&t.editorAttrs&&t.editorAttrs.type&&(n=t.editorAttrs.type),t&&t.dataType&&(n=t.dataType),this.$el.attr("type",n)},render:function(){return this.setValue(this.value),this},determineChange:function(e){var t=this.$el.val(),n=t!==this.previousValue;n&&(this.previousValue=t,this.trigger("change",this))},getValue:function(){return this.$el.val()},setValue:function(e){this.$el.val(e)},focus:function(){if(this.hasFocus)return;this.$el.focus()},blur:function(){if(!this.hasFocus)return;this.$el.blur()},select:function(){this.$el.select()}}),i.editors.TextArea=i.editors.Text.extend({tagName:"textarea",initialize:function(e){i.editors.Base.prototype.initialize.call(this,e)}}),i.editors.Password=i.editors.Text.extend({initialize:function(e){i.editors.Text.prototype.initialize.call(this,e),this.$el.attr("type","password")}}),i.editors.Number=i.editors.Text.extend({defaultValue:0,events:n.extend({},i.editors.Text.prototype.events,{keypress:"onKeyPress",change:"onKeyPress"}),initialize:function(e){i.editors.Text.prototype.initialize.call(this,e);var t=this.schema;this.$el.attr("type","number"),(!t||!t.editorAttrs||!t.editorAttrs.step)&&this.$el.attr("step","any")},onKeyPress:function(e){var t=this,n=function(){setTimeout(function(){t.determineChange()},0)};if(e.charCode===0){n();return}var r=this.$el.val();e.charCode!=undefined&&(r+=String.fromCharCode(e.charCode));var i=/^[0-9]*\.?[0-9]*?$/.test(r);i?n():e.preventDefault()},getValue:function(){var e=this.$el.val();return e===""?null:parseFloat(e,10)},setValue:function(e){e=function(){return n.isNumber(e)?e:n.isString(e)&&e!==""?parseFloat(e,10):null}(),n.isNaN(e)&&(e=null),i.editors.Text.prototype.setValue.call(this,e)}}),i.editors.Hidden=i.editors.Text.extend({defaultValue:"",initialize:function(e){i.editors.Text.prototype.initialize.call(this,e),this.$el.attr("type","hidden")},focus:function(){},blur:function(){}}),i.editors.Checkbox=i.editors.Base.extend({defaultValue:!1,tagName:"input",events:{click:function(e){this.trigger("change",this)},focus:function(e){this.trigger("focus",this)},blur:function(e){this.trigger("blur",this)}},initialize:function(e){i.editors.Base.prototype.initialize.call(this,e),this.$el.attr("type","checkbox")},render:function(){return this.setValue(this.value),this},getValue:function(){return this.$el.prop("checked")},setValue:function(e){e?this.$el.prop("checked",!0):this.$el.prop("checked",!1)},focus:function(){if(this.hasFocus)return;this.$el.focus()},blur:function(){if(!this.hasFocus)return;this.$el.blur()}}),i.editors.Select=i.editors.Base.extend({tagName:"select",events:{change:function(e){this.trigger("change",this)},focus:function(e){this.trigger("focus",this)},blur:function(e){this.trigger("blur",this)}},initialize:function(e){i.editors.Base.prototype.initialize.call(this,e);if(!this.schema||!this.schema.options)throw"Missing required 'schema.options'"},render:function(){return this.setOptions(this.schema.options),this},setOptions:function(e){var t=this;if(e instanceof r.Collection){var i=e;i.length>0?this.renderOptions(e):i.fetch({success:function(n){t.renderOptions(e)}})}else n.isFunction(e)?e(function(e){t.renderOptions(e)},t):this.renderOptions(e)},renderOptions:function(e){var t=this.$el,n;n=this._getOptionsHtml(e),t.html(n),this.setValue(this.value)},_getOptionsHtml:function(e){var t;if(n.isString(e))t=e;else if(n.isArray(e))t=this._arrayToHtml(e);else if(e instanceof r.Collection)t=this._collectionToHtml(e);else if(n.isFunction(e)){var i;e(function(e){i=e},this),t=this._getOptionsHtml(i)}return t},getValue:function(){return this.$el.val()},setValue:function(e){this.$el.val(e)},focus:function(){if(this.hasFocus)return;this.$el.focus()},blur:function(){if(!this.hasFocus)return;this.$el.blur()},_collectionToHtml:function(e){var t=[];e.each(function(e){t.push({val:e.id,label:e.toString()})});var n=this._arrayToHtml(t);return n},_arrayToHtml:function(e){var t=[];return n.each(e,function(e){if(n.isObject(e))if(e.group)t.push('<optgroup label="'+e.group+'">'),t.push(this._getOptionsHtml(e.options)),t.push("</optgroup>");else{var r=e.val||e.val===0?e.val:"";t.push('<option value="'+r+'">'+e.label+"</option>")}else t.push("<option>"+e+"</option>")},this),t.join("")}}),i.editors.Radio=i.editors.Select.extend({tagName:"ul",events:{"change input[type=radio]":function(){this.trigger("change",this)},"focus input[type=radio]":function(){if(this.hasFocus)return;this.trigger("focus",this)},"blur input[type=radio]":function(){if(!this.hasFocus)return;var e=this;setTimeout(function(){if(e.$("input[type=radio]:focus")[0])return;e.trigger("blur",e)},0)}},getValue:function(){return this.$("input[type=radio]:checked").val()},setValue:function(e){this.$("input[type=radio]").val([e])},focus:function(){if(this.hasFocus)return;var e=this.$("input[type=radio]:checked");if(e[0]){e.focus();return}this.$("input[type=radio]").first().focus()},blur:function(){if(!this.hasFocus)return;this.$("input[type=radio]:focus").blur()},_arrayToHtml:function(e){var t=[],r=this;return n.each(e,function(e,i){var s="<li>";if(n.isObject(e)){var o=e.val||e.val===0?e.val:"";s+='<input type="radio" name="'+r.getName()+'" value="'+o+'" id="'+r.id+"-"+i+'" />',s+='<label for="'+r.id+"-"+i+'">'+e.label+"</label>"}else s+='<input type="radio" name="'+r.getName()+'" value="'+e+'" id="'+r.id+"-"+i+'" />',s+='<label for="'+r.id+"-"+i+'">'+e+"</label>";s+="</li>",t.push(s)}),t.join("")}}),i.editors.Checkboxes=i.editors.Select.extend({tagName:"ul",events:{"click input[type=checkbox]":function(){this.trigger("change",this)},"focus input[type=checkbox]":function(){if(this.hasFocus)return;this.trigger("focus",this)},"blur input[type=checkbox]":function(){if(!this.hasFocus)return;var e=this;setTimeout(function(){if(e.$("input[type=checkbox]:focus")[0])return;e.trigger("blur",e)},0)}},getValue:function(){var e=[];return this.$("input[type=checkbox]:checked").each(function(){e.push(t(this).val())}),e},setValue:function(e){n.isArray(e)||(e=[e]),this.$("input[type=checkbox]").val(e)},focus:function(){if(this.hasFocus)return;this.$("input[type=checkbox]").first().focus()},blur:function(){if(!this.hasFocus)return;this.$("input[type=checkbox]:focus").blur()},_arrayToHtml:function(e){var t=[],r=this;return n.each(e,function(e,i){var s="<li>";if(n.isObject(e)){var o=e.val||e.val===0?e.val:"";s+='<input type="checkbox" name="'+r.getName()+'" value="'+o+'" id="'+r.id+"-"+i+'" />',s+='<label for="'+r.id+"-"+i+'">'+e.label+"</label>"}else s+='<input type="checkbox" name="'+r.getName()+'" value="'+e+'" id="'+r.id+"-"+i+'" />',s+='<label for="'+r.id+"-"+i+'">'+e+"</label>";s+="</li>",t.push(s)}),t.join("")}}),i.editors.Object=i.editors.Base.extend({hasNestedForm:!0,initialize:function(e){this.value={},i.editors.Base.prototype.initialize.call(this,e);if(!this.form)throw'Missing required option "form"';if(!this.schema.subSchema)throw new Error("Missing required 'schema.subSchema' option for Object editor")},render:function(){var e=this.form.constructor;return this.nestedForm=new e({schema:this.schema.subSchema,data:this.value,idPrefix:this.id+"_",Field:e.NestedField}),this._observeFormEvents(),this.$el.html(this.nestedForm.render().el),this.hasFocus&&this.trigger("blur",this),this},getValue:function(){return this.nestedForm?this.nestedForm.getValue():this.value},setValue:function(e){this.value=e,this.render()},focus:function(){if(this.hasFocus)return;this.nestedForm.focus()},blur:function(){if(!this.hasFocus)return;this.nestedForm.blur()},remove:function(){this.nestedForm.remove(),r.View.prototype.remove.call(this)},validate:function(){return this.nestedForm.validate()},_observeFormEvents:function(){if(!this.nestedForm)return;this.nestedForm.on("all",function(){var e=n.toArray(arguments);e[1]=this,this.trigger.apply(this,e)},this)}}),i.editors.NestedModel=i.editors.Object.extend({initialize:function(e){i.editors.Base.prototype.initialize.call(this,e);if(!this.form)throw'Missing required option "form"';if(!e.schema.model)throw'Missing required "schema.model" option for NestedModel editor'},render:function(){var e=this.form.constructor,t=this.value||{},n=this.key,r=this.schema.model,i=t.constructor===r?t:new r(t);return this.nestedForm=new e({model:i,idPrefix:this.id+"_",fieldTemplate:"nestedField"}),this._observeFormEvents(),this.$el.html(this.nestedForm.render().el),this.hasFocus&&this.trigger("blur",this),this},commit:function(){var e=this.nestedForm.commit();return e?(this.$el.addClass("error"),e):i.editors.Object.prototype.commit.call(this)}}),i.editors.Date=i.editors.Base.extend({events:{"change select":function(){this.updateHidden(),this.trigger("change",this)},"focus select":function(){if(this.hasFocus)return;this.trigger("focus",this)},"blur select":function(){if(!this.hasFocus)return;var e=this;setTimeout(function(){if(e.$("select:focus")[0])return;e.trigger("blur",e)},0)}},initialize:function(e){e=e||{},i.editors.Base.prototype.initialize.call(this,e);var t=i.editors.Date,r=new Date;this.options=n.extend({monthNames:t.monthNames,showMonthNames:t.showMonthNames},e),this.schema=n.extend({yearStart:r.getFullYear()-100,yearEnd:r.getFullYear()},e.schema||{}),this.value&&!n.isDate(this.value)&&(this.value=new Date(this.value));if(!this.value){var s=new Date;s.setSeconds(0),s.setMilliseconds(0),this.value=s}this.template=e.template||this.constructor.template},render:function(){var e=this.options,r=this.schema,i=n.map(n.range(1,32),function(e){return'<option value="'+e+'">'+e+"</option>"}),s=n.map(n.range(0,12),function(t){var n=e.showMonthNames?e.monthNames[t]:t+1;return'<option value="'+t+'">'+n+"</option>"}),o=r.yearStart<r.yearEnd?n.range(r.yearStart,r.yearEnd+1):n.range(r.yearStart,r.yearEnd-1,-1),u=n.map(o,function(e){return'<option value="'+e+'">'+e+"</option>"}),a=t(t.trim(this.template({dates:i.join(""),months:s.join(""),years:u.join("")})));return this.$date=a.find('[data-type="date"]'),this.$month=a.find('[data-type="month"]'),this.$year=a.find('[data-type="year"]'),this.$hidden=t('<input type="hidden" name="'+this.key+'" />'),a.append(this.$hidden),this.setValue(this.value),this.setElement(a),this.$el.attr("id",this.id),this.$el.attr("name",this.getName()),this.hasFocus&&this.trigger("blur",this),this},getValue:function(){var e=this.$year.val(),t=this.$month.val(),n=this.$date.val();return!e||!t||!n?null:new Date(e,t,n)},setValue:function(e){this.$date.val(e.getDate()),this.$month.val(e.getMonth()),this.$year.val(e.getFullYear()),this.updateHidden()},focus:function(){if(this.hasFocus)return;this.$("select").first().focus()},blur:function(){if(!this.hasFocus)return;this.$("select:focus").blur()},updateHidden:function(){var e=this.getValue();n.isDate(e)&&(e=e.toISOString()),this.$hidden.val(e)}},{template:n.template('    <div>      <select data-type="date"><%= dates %></select>      <select data-type="month"><%= months %></select>      <select data-type="year"><%= years %></select>    </div>  ',null,i.templateSettings),showMonthNames:!0,monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"]}),i.editors.DateTime=i.editors.Base.extend({events:{"change select":function(){this.updateHidden(),this.trigger("change",this)},"focus select":function(){if(this.hasFocus)return;this.trigger("focus",this)},"blur select":function(){if(!this.hasFocus)return;var e=this;setTimeout(function(){if(e.$("select:focus")[0])return;e.trigger("blur",e)},0)}},initialize:function(e){e=e||{},i.editors.Base.prototype.initialize.call(this,e),this.options=n.extend({DateEditor:i.editors.DateTime.DateEditor},e),this.schema=n.extend({minsInterval:15},e.schema||{}),this.dateEditor=new this.options.DateEditor(e),this.value=this.dateEditor.value,this.template=e.template||this.constructor.template},render:function(){function e(e){return e<10?"0"+e:e}var r=this.schema,i=n.map(n.range(0,24),function(t){return'<option value="'+t+'">'+e(t)+"</option>"}),s=n.map(n.range(0,60,r.minsInterval),function(t){return'<option value="'+t+'">'+e(t)+"</option>"}),o=t(t.trim(this.template({hours:i.join(),mins:s.join()})));return o.find("[data-date]").append(this.dateEditor.render().el),this.$hour=o.find('select[data-type="hour"]'),this.$min=o.find('select[data-type="min"]'),this.$hidden=o.find('input[type="hidden"]'),this.setValue(this.value),this.setElement(o),this.$el.attr("id",this.id),this.$el.attr("name",this.getName()),this.hasFocus&&this.trigger("blur",this),this},getValue:function(){var e=this.dateEditor.getValue(),t=this.$hour.val(),n=this.$min.val();return!e||!t||!n?null:(e.setHours(t),e.setMinutes(n),e)},setValue:function(e){n.isDate(e)||(e=new Date(e)),this.dateEditor.setValue(e),this.$hour.val(e.getHours()),this.$min.val(e.getMinutes()),this.updateHidden()},focus:function(){if(this.hasFocus)return;this.$("select").first().focus()},blur:function(){if(!this.hasFocus)return;this.$("select:focus").blur()},updateHidden:function(){var e=this.getValue();n.isDate(e)&&(e=e.toISOString()),this.$hidden.val(e)},remove:function(){this.dateEditor.remove(),i.editors.Base.prototype.remove.call(this)}},{template:n.template('    <div class="bbf-datetime">      <div class="bbf-date-container" data-date></div>      <select data-type="hour"><%= hours %></select>      :      <select data-type="min"><%= mins %></select>    </div>  ',null,i.templateSettings),DateEditor:i.editors.Date}),i.VERSION="0.12.0",r.Form=i})(this)
