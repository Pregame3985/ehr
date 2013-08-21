(function(e,t,n){var r=t.templateSettings;t.templateSettings={interpolate:/\{\{(.+?)\}\}/g,evaluate:/<%([\s\S]+?)%>/g};var i=t.template('    <% if (title) { %>      <div class="modal-header">        <% if (allowCancel) { %>          <a class="close">×</a>        <% } %>        <h3>{{title}}</h3>      </div>    <% } %>    <div class="modal-body">{{content}}</div>    <div class="modal-footer">      <% if (allowCancel) { %>        <% if (cancelText) { %>          <a href="#" class="btn cancel">{{cancelText}}</a>        <% } %>      <% } %>      <a href="#" class="btn ok btn-primary">{{okText}}</a>    </div>  ');t.templateSettings=r;var s=n.View.extend({className:"modal",events:{"click .close":function(e){e.preventDefault(),this.trigger("cancel")},"click .cancel":function(e){e.preventDefault(),this.trigger("cancel")},"click .ok":function(e){e.preventDefault(),this.trigger("ok"),this.close()}},initialize:function(e){this.options=t.extend({title:null,okText:"OK",cancelText:"Cancel",allowCancel:!0,escape:!0,animate:!1,template:i},e)},render:function(){var e=this.$el,t=this.options,n=t.content;e.html(t.template(t));var r=this.$content=e.find(".modal-body");return n.$el&&e.find(".modal-body").html(n.render().$el),t.animate&&e.addClass("fade"),this.isRendered=!0,this},open:function(t){this.isRendered||this.render();var n=this,r=this.$el;r.modal({keyboard:this.options.allowCancel,backdrop:this.options.allowCancel?!0:"static"}),r.one("shown",function(){r.find(".btn.ok").focus(),n.trigger("shown")});var i=s.count,o=e(".modal-backdrop:eq("+i+")"),u=o.css("z-index"),a=o.css("z-index");return o.css("z-index",u+i),this.$el.css("z-index",a+i),this.options.allowCancel&&(o.one("click",function(){n.trigger("cancel")}),e(document).one("keyup.dismiss.modal",function(e){e.which==27&&n.trigger("cancel")})),this.on("cancel",function(){n.close()}),s.count++,t&&n.on("ok",t),this},close:function(){var e=this,t=this.$el;if(this._preventClose){this._preventClose=!1;return}t.modal("hide"),t.one("hidden",function(){e.remove(),e.trigger("hidden")}),s.count--},preventClose:function(){this._preventClose=!0}},{count:0});typeof require=="function"&&typeof module!="undefined"&&exports&&(module.exports=s);if(typeof define=="function"&&define.amd)return define(function(){n.BootstrapModal=s});n.BootstrapModal=s})(jQuery,_,Backbone)
