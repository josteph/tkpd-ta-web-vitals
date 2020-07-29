export const hotjarScript =  `
	<!-- Hotjar Tracking Code for https://tkpd-ta-web-vitals.glitch.me/ -->
	<script>
			(function(h,o,t,j,a,r){
					h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
					h._hjSettings={hjid:1919468,hjsv:6};
					a=o.getElementsByTagName('head')[0];
					r=o.createElement('script');r.async=1;
					r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
					a.appendChild(r);
			})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
	</script>
`;

export const disqusScript =  `
	<div id="disqus_thread" style="max-width: 500px;margin: 0 auto;padding: 2em;border-left: 1px solid rgb(255, 255, 255);border-right: 1px solid rgb(255, 255, 255);"></div>
	<script>
		/**
		*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
		*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
		/*
		var disqus_config = function () {
			this.page.url = 'https://tkpd-ta-web-vitals.glitch.me/';  // Replace PAGE_URL with your page's canonical URL variable
			this.page.identifier = 'home'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
		};
		*/
		(function() { // DON'T EDIT BELOW THIS LINE
			var d = document, s = d.createElement('script');
			s.src = 'https://test-disqus-13.disqus.com/embed.js';
			s.setAttribute('data-timestamp', +new Date());
			(d.head || d.body).appendChild(s);
		})();
	</script>
	<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
	<script id="dsq-count-scr" src="//test-disqus-13.disqus.com/count.js" async></script>
`;
