JS
==

js hints and hacks

<h2>stringToColor.js</h2>

`stringToColor` function returns the same color for the same string.

Can be used as a background color for avatar with white text on it, because it does not return too much light colors.

<h2>onload-event.js</h2>

Little script for run event after all images loaded.

<h2>jquery.creditСardFormat.js</h2>

jQuery plugin for checking input field by Credit Card Format like [xxxx-xxxx-xxxx-xxxx], which add and delete hyphen.

2 unnecessary options: 
<ul>
<li><code>positionArray</code> - array of hyphen after specified numeral</li>
<li><code>lengthArray</code> length of credit card number without hyphen</li>
</ul>

By default:

<pre><code>positionArray : [4, 8, 12]
lengthArray   : 16  
</code></pre>

Call: 
<pre><code>$('input').creditСardFormat();</code></pre>


<h2>jquery.currencyFormat.js</h2>

jQuery plugin for making Currency field with "$" and commas like: $12,345.<br />
It is wrapping input in &lt;div&gt; and adding hidden input with same name (for sending to server just a number).

Call: 
<pre><code>$('input').currencyFormat();</code></pre>

<h2>ellipsis.js</h2>

jQuery plugin for cutting text and adding ellipsis at the end.<br />
Require DIV with "overflow: hidden" style and fixed height and tag P inside.

Call: 
<pre><code>$('.ellipsis').addEllipsis();</code></pre>

<h2>jquery.popup.js</h2>
jQuery plugin for creating popup near element target: by showing hidden popup or loading by ajax.<br />
Use: <br />
<code>[data-popup-link='name']</code> - use for target with <code>name</code> as identifier<br />
<code>[data-popup-content='name']</code> - popup content, be default should be hidden<br />
<code>[data-popup-url='url']</code> - set url for ajax or <code>'href'</code><br />
<code>[data-popup-close='name']</code> - add close button on popup

Call: 
<pre><code>$('[data-popup-link]').popup();</code></pre>
