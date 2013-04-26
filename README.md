JS
==

js hints and hacks

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
