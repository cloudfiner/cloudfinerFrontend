import step1 from "@/assets/console_pointer.png";

const Step2Console = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Open AWS Console</h2>

    <img src={step1} className="rounded-xl border border-gray-700" />

    <a
      href="https://console.aws.amazon.com/"
      target="_blank"
      className="inline-block px-4 py-1.5 text-sm rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400"
    >
      Open AWS
    </a>
  </div>
);

export default Step2Console;