import React, { useEffect, useRef, memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// Define the type for the state
type BuySignalState = {
  minute: boolean | null;
  hour: boolean | null;
  fourHours: boolean | null;
  day: boolean | null;
};

function TradingViewWidget1Hours() {
  const container1Minute = useRef<HTMLDivElement>(null);
  const container1Hour = useRef<HTMLDivElement>(null);
  const container4Hours = useRef<HTMLDivElement>(null);
  const container1Day = useRef<HTMLDivElement>(null);
  const [buySignal, setBuySignal] = useState<BuySignalState>({
    minute: null,
    hour: null,
    fourHours: null,
    day: null
  });

  useEffect(() => {
    const addTradingViewScript = (containerRef: React.RefObject<HTMLDivElement>, symbol: string, interval: string, withMACD: boolean) => {
      if (!containerRef.current?.querySelector("script")) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "width": "1000",
          "height": "800",
          "symbol": symbol,
          "interval": interval,
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "studies": withMACD ? ["STD;MACD"] : [],
          "support_host": "https://www.tradingview.com"
        });
        containerRef.current?.appendChild(script);
      }
    };

    const simulateMACD = (timeframe: keyof BuySignalState) => {
      setInterval(() => {
        const isUp = Math.random() < 0.5;
        setBuySignal(prevState => ({ ...prevState, [timeframe]: isUp }));
        setTimeout(() => {
          setBuySignal(prevState => ({ ...prevState, [timeframe]: null }));
        }, 20000);
      }, 30000);
    };

    addTradingViewScript(container1Minute, "MEXC:BTCUSDT", "1", true);
    addTradingViewScript(container1Hour, "MEXC:BTCUSDT", "60", true);
    addTradingViewScript(container4Hours, "MEXC:BTCUSDT", "240", true);
    addTradingViewScript(container1Day, "MEXC:BTCUSDT", "1D", true);

    simulateMACD("minute");
    simulateMACD("hour");
    simulateMACD("fourHours");
    simulateMACD("day");
  }, []);

  return (
    <Container className="divide-y-2">
      <Row>
        <Col>
          <h1 className="text-center my-4 bold d-flex gap-2 align-items-center justify-content-center text-capitalize">
            <small className="text-secondary">BTC</small>
            to
            <small className="text-primary">USDT</small>
            live data
          </h1>
        </Col>
      </Row>
      {["minute", "hour", "fourHours", "day"].map((timeframe, index) => (
        <Row key={index}>
          <Col>
            <h5 className="text-start fw-bold d-flex align-items-center gap-1" style={{ margin: "41px;" }}>
              <span>MACD</span>
              <small className="text-primary">({timeframe})</small>
            </h5>
            <div className="tradingview-widget-container w-100" ref={timeframe === "minute" ? container1Minute : timeframe === "hour" ? container1Hour : timeframe === "fourHours" ? container4Hours : container1Day}>
              <div className="tradingview-widget-container__widget"></div>
              <div className="tradingview-widget-messages d-flex align-items-center justify-content-center" style={{ margin: "10px", padding: "10px" }}>
                {buySignal[timeframe as keyof BuySignalState] !== null && (
                  <div className={`rounded-circle ${buySignal[timeframe as keyof BuySignalState] ? "bg-success" : "bg-danger"}`} style={{ width: "77px", height: "80px" }}></div>
                )}
                <strong><span className={buySignal[timeframe as keyof BuySignalState] ? "text-success" : "text-danger"}>{buySignal[timeframe as keyof BuySignalState] ? "" : ""}</span></strong>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default memo(TradingViewWidget1Hours);
