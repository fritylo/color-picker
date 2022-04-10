export default async function copyToClipboard(text) {
   return new Promise((resolve, reject) => {
      function fallbackCopyTextToClipboard(text) {
         var textArea = document.createElement("textarea");
         textArea.value = text;

         // Avoid scrolling to bottom
         textArea.style.top = "0";
         textArea.style.left = "0";
         textArea.style.position = "fixed";

         document.body.appendChild(textArea);
         textArea.focus();
         textArea.select();

         try {
            var successful = document.execCommand('copy');

            if (!successful)
               reject(text);
         } catch (err) {
            reject(err);
         }

         document.body.removeChild(textArea);
         resolve(text);
      };
      
      if (!navigator.clipboard) 
         fallbackCopyTextToClipboard(text);
      
      return navigator.clipboard.writeText(text).then(() => resolve(text), reject);
   });
}