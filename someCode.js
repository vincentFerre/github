<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion 1" content="### master branch">
  <meta name="CocoaVersion 2" content="### TICKET53 branch">
  <meta name="CocoaVersion" content="4567">

  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
    span.Apple-tab-span {white-space:pre}
  </style>
</head>
<body>
<div>Aloha </div>
<p class="p1">define(function(require) {</p>
<p class="p1"><span class="Apple-tab-span">	</span>var tmplFulfillments = require('checkout/dust/tasks/deliveryOptions/fulfillments');</p>
<p class="p1"><span class="Apple-converted-space">    </span>var tmplEmailForm = require('checkout/dust/tasks/deliveryOptions/partials/email-form');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>var Validatr = require('_validatr/javascript/validatr/validatr');</p>
<p class="p1"><span class="Apple-converted-space">    </span>var FormDecorator = require('_validatr/javascript/formDecorator/formDecorator');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-tab-span">	</span>var FulfillmentView = Backbone.View.extend({</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>// Initialize</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>initialize: function(options) {</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>this.selectedFulfillmentType = options.selectedFulfillmentType;</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>this.render();</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.initializeValidator();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>this.listenTo(this.model, 'change', this.render);</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>return this;</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>initializeValidator: function(){</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.validatr = new Validatr([</p>
<p class="p1"><span class="Apple-converted-space">                </span>{</p>
<p class="p1"><span class="Apple-converted-space">                    </span>attribute: 'email',</p>
<p class="p1"><span class="Apple-converted-space">                    </span>validate: 'presenceOf',</p>
<p class="p1"><span class="Apple-converted-space">                    </span>message: 'Please enter an e-mail address.'</p>
<p class="p1"><span class="Apple-converted-space">                </span>},</p>
<p class="p1"><span class="Apple-converted-space">                </span>{</p>
<p class="p1"><span class="Apple-converted-space">                    </span>attribute: 'email',</p>
<p class="p1"><span class="Apple-converted-space">                    </span>validate: 'isEmail',</p>
<p class="p1"><span class="Apple-converted-space">                    </span>message: 'The e-mail address you entered is not valid. Please check the address and try again.'</p>
<p class="p1"><span class="Apple-converted-space">                </span>}</p>
<p class="p1"><span class="Apple-converted-space">            </span>]);</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>initializeFormDecorator: function() {</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.formDecorator = new FormDecorator({</p>
<p class="p1"><span class="Apple-converted-space">                </span>inputs: this.$('input'),</p>
<p class="p1"><span class="Apple-converted-space">                </span>validator: this.validatr,</p>
<p class="p1"><span class="Apple-converted-space">                </span>decorator: function(field, messages) {</p>
<p class="p1"><span class="Apple-converted-space">                    </span>$error = $('&lt;span class="errors"&gt;' + messages[0].toString() + '&lt;/span&gt;');</p>
<p class="p1"><span class="Apple-converted-space">                    </span>field.$element.after($error);</p>
<p class="p1"><span class="Apple-converted-space">                    </span>field.$element.addClass('client-error-input');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">                    </span>return function() {</p>
<p class="p1"><span class="Apple-converted-space">                        </span>field.$element.next().remove();</p>
<p class="p1"><span class="Apple-converted-space">                        </span>field.$element.removeClass('client-error-input');</p>
<p class="p1"><span class="Apple-converted-space">                    </span>};</p>
<p class="p1"><span class="Apple-converted-space">                </span>}</p>
<p class="p1"><span class="Apple-converted-space">            </span>});</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>// Events</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>events:{</p>
<p class="p1"><span class="Apple-converted-space">            </span>"click .email-edit": "onEditEmailClick",</p>
<p class="p1"><span class="Apple-converted-space">            </span>"click .email-apply": "onApplyEmailClick",</p>
<p class="p1"><span class="Apple-converted-space">            </span>"click .email-cancel": "onCancelEmailClick",</p>
<p class="p1"><span class="Apple-converted-space">            </span>"keypress [name='email']": "onEmailKeyPress"</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>},</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>// Render functions</p>
<p class="p1"><span class="Apple-converted-space">        </span>render: function() {</p>
<p class="p1"><span class="Apple-converted-space">            </span>var self = this;</p>
<p class="p1"><span class="Apple-converted-space">            </span>var selectedFulfillmentMeta = this.model.get('meta');</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.selectedFulfillment = this.model.get('fulfillments')[this.selectedFulfillmentType];</p>
<p class="p1"><span class="Apple-converted-space">            </span>var base = dust.makeBase({</p>
<p class="p1"><span class="Apple-converted-space">                </span>'fulfillment': self.selectedFulfillment</p>
<p class="p1"><span class="Apple-converted-space">            </span>});</p>
<p class="p1"><span class="Apple-converted-space">            </span>return tmplFulfillments.render(base.push({'type': self.selectedFulfillmentType, 'meta': selectedFulfillmentMeta}))</p>
<p class="p1"><span class="Apple-converted-space">                </span>.then(_.bind(function(html) {</p>
<p class="p1"><span class="Apple-converted-space">                    </span>this.$el.html(html);</p>
<p class="p1"><span class="Apple-converted-space">                </span>}, this));</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p1"><span class="Apple-converted-space">        </span>renderEmailEdit: function (itemId) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>return tmplEmailForm.render(this.selectedFulfillment.email)</p>
<p class="p1"><span class="Apple-converted-space">                </span>.then(_.bind(function(html) {</p>
<p class="p1"><span class="Apple-converted-space">                    </span>this.$el.find('.email-container').html(html);</p>
<p class="p1"><span class="Apple-converted-space">                </span>}, this));</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>// UI Actions</p>
<p class="p1"><span class="Apple-converted-space">        </span>onEditEmailClick: function(e) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>e.preventDefault();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>var id = this.model.get('id');</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.renderEmailEdit(id).then(_.bind(function(){</p>
<p class="p1"><span class="Apple-converted-space">                </span>this.initializeFormDecorator()</p>
<p class="p1"><span class="Apple-converted-space">            </span>},this));</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>onApplyEmailClick: function(e) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>e.preventDefault();</p>
<p class="p1"><span class="Apple-converted-space">            </span>e.stopPropagation();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>if(this.formDecorator){</p>
<p class="p1"><span class="Apple-converted-space">                </span>this.formDecorator.clear();</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>if(this.selectedFulfillment.email === this.$("[name='email']").val()){</p>
<p class="p1"><span class="Apple-converted-space">                </span>return this.render();</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>if(!this.validatr.validate($('.line-item-email-form'))){</p>
<p class="p1"><span class="Apple-converted-space">               </span>this.formDecorator.render(this.validatr.validationErrors());</p>
<p class="p1"><span class="Apple-converted-space">               </span>return false;</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>var clonedEmail = _.clone(this.model.get('fulfillments')[this.selectedFulfillmentType]);</p>
<p class="p1"><span class="Apple-converted-space">            </span>var email = _.extend(clonedEmail, {email: this.$("[name='email']").val()});</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.model.save({'fulfillments': {"email": email}}, {patch: true, wait:true});</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>onCancelEmailClick: function(e) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>e.preventDefault();</p>
<p class="p1"><span class="Apple-converted-space">            </span>this.render();</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>onEmailKeyPress: function(e){</p>
<p class="p1"><span class="Apple-converted-space">            </span>if(e.keyCode == 13){</p>
<p class="p1"><span class="Apple-converted-space">                </span>this.onApplyEmailClick(e);</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-tab-span">	</span>});</p>
<p class="p1"><span class="Apple-tab-span">	</span>return FulfillmentView;</p>
<p class="p1">});</p>
</body>
</html>
