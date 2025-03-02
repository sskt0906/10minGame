import { useState, useEffect } from "react";

export default function ClickGame() {
  // クリック回数を管理するステート
  const [count, setCount] = useState(0);
  // ゲームが進行中かどうかを管理するステート
  const [isPlaying, setIsPlaying] = useState(false);
  // 残り時間を管理するステート
  const [timeLeft, setTimeLeft] = useState(10);
  // ゲーム終了時のメッセージ
  const [result, setResult] = useState("");

  // 合格ラインの設定
  const PASS_SCORE = 50;

  // クリック回数を増やす関数
  const handleClick = () => {
    if (isPlaying) {
      setCount((prev) => prev + 1);
    }
  };

  // ゲームを開始する関数
  const startGame = () => {
    setCount(0); // クリック回数をリセット
    setTimeLeft(10); // 残り時間をリセット
    setIsPlaying(true); // ゲームを開始
    setResult(""); // 結果をリセット
  };

  // タイマーの管理
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      // 1秒ごとに残り時間を減らす
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // ゲーム終了処理
      setIsPlaying(false);
      setResult(count >= PASS_SCORE ? "合格！" : "残念！");
    }
  }, [isPlaying, timeLeft]);

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-3">クリック連打ゲーム</h1>
      <p className="mb-2">残り時間: {timeLeft} 秒</p>
      <p className="mb-4">クリック回数: {count}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        onClick={handleClick}
        disabled={!isPlaying}
      >
        クリック！
      </button>
      <button
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
        onClick={startGame}
        disabled={isPlaying}
      >
        ゲーム開始
      </button>
      {result && <p className="mt-4 text-xl font-bold">{result}</p>}
    </div>
  );
}
