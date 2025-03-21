import React, { useEffect, useRef } from 'react';

type WidgetProps = {
  mode: string;
};

// this is the KoFi widget at the bottom of the leaderboard
// TODO: figure out a way to dynamically change background color

const KoFiWidget = ({ mode }: WidgetProps) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentWindow.document;

    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    script1.async = true;
    iframeDoc.body.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.innerHTML = `kofiwidget2.init('Support InCo on Ko-fi', '#7030a0', 'G2G412HLTW');kofiwidget2.draw();`;
      iframeDoc.body.appendChild(script2);

      setTimeout(() => {
        iframeDoc.body.style.background = '#7030a0'; // hard coding color due to rendering
      }, 100);

      // Adjust the style of the btn-container after the widget is loaded
      const btnContainer = iframeDoc.querySelector('div.btn-container');
      if (btnContainer) {
        btnContainer.setAttribute(
          'style',
          'display: flex !important; justify-content: center !important; align-items: center !important; width: 100% !important;'
        );
      }
    };

    // Set the iframe dimensions after the content is loaded
    const adjustIframeSize = () => {
      iframe.style.width = '100%';
      iframe.style.height = iframeDoc.body.scrollHeight + 'px';
    };

    iframe.addEventListener('load', adjustIframeSize);
    return () => {
      iframe.removeEventListener('load', adjustIframeSize);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Ko-fi Widget"
      style={{
        border: 'none',
        width: '100%',
        height: '54px',
        overflow: 'hidden',
        margin: '16px',
        display: 'inline-block',
        background: 'transparent',
      }}
    />
  );
};

export default KoFiWidget;
