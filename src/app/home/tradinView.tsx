import React, { useEffect, useRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null); // Specify the type of ref

  useEffect(() => {
    // Check if the script has already been appended
    if (container.current && !container.current.querySelector("script")) { // Add null check for container.current
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "width": "1000",
        "height": "800",
        "symbol": "BINANCE:BTCUSDT",
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "calendar": false,
        "studies": [
          
        ],
        "support_host": "https://www.tradingview.com"
      }`;
      container.current.appendChild(script);
    }
  },
  []
);

  return (
    <Container className='divide-y-2'>
      <Row>
        <Col>
          <h1 className='text-center my-4 bold d-flex gap-2 align-items-center justify-content-center text-capitalize'>
            <small className='text-secondary'>
              BTC
            </small>
            {/* <small className='text-primary'>
              USDT
            </small> */}
            live Chart
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
        {/* <div className="parent"> */}
          <div className="tradingview-widget-container w-100" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
          {/* </div> */}
        </div>
        </Col>
      </Row>
      {/* <div className="parent">
        <div className="tradingview-widget-container" ref={container}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div> */}
    </Container>
  );
}
export default memo(TradingViewWidget);
