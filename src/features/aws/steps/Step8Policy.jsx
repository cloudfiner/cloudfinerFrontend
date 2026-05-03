// // import step7img from "@/assets/pointToAddPolicy.png";

// // const Step8Policy = () => (
// //   <div className="space-y-4">
// //     <h2 className="text-lg font-semibold">Attach ReadOnlyAccess Policy</h2>

// //     <img src={step7img} className="rounded-xl border border-gray-700" />

// //     <p className="text-gray-400 text-sm">
// //       Search <b>ReadOnlyAccess</b> OR sort A→Z and go to <b>R</b>.
// //     </p>
// //   </div>
// // );

// // export default Step8Policy;


// import step7img from "@/assets/pointToAddPolicy.png";

// const Step8Policy = ({ policy, copy }) => (
//   <div className="space-y-5">

//     <h2 className="text-lg font-semibold">
//       Attach Cost Access Policy
//     </h2>

//     <img src={step7img} className="rounded-xl border border-gray-700" />

//     {/* OPTION 1 */}
//     <div className="bg-white/5 border border-gray-700 rounded-xl p-4">
//       <p className="text-sm text-gray-300">
//         <b>Recommended:</b> Search for
//         <span className="text-blue-400"> AWSBillingReadOnlyAccess </span>
//         and select it.
//       </p>
//     </div>

//     {/* OR */}
//     <div className="text-center text-gray-500 text-xs">OR</div>

//     {/* OPTION 2 */}
//     <div className="bg-white/5 border border-gray-700 rounded-xl p-4 space-y-3">

//       <p className="text-sm text-gray-300">
//         If you cannot find the policy, create a custom policy:
//       </p>

//       <ol className="text-xs text-gray-400 list-decimal list-inside space-y-1">
//         <li>Click <b>Create Policy</b></li>
//         <li>Go to <b>JSON</b> tab</li>
//         <li>Paste the below policy</li>
//       </ol>

//       {/* COPY BUTTON */}
//       <div className="flex justify-between items-center">
//         <span className="text-xs text-gray-500">Policy JSON</span>
//         <button
//           onClick={() => copy(policy)}
//           className="text-xs px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
//         >
//           Copy
//         </button>
//       </div>

//       {/* POLICY PREVIEW */}
//       <div className="bg-black/40 p-3 rounded text-xs text-gray-300 max-h-40 overflow-auto">
//         {policy}
//       </div>

//     </div>

//   </div>
// );

// export default Step8Policy;
















import step7img from "@/assets/pointToAddPolicy.png";

const Step8Policy = ({ policy, copy, onNeedHelp }) => (
  <div className="space-y-6">

    {/* TITLE */}
    <h2 className="text-lg font-semibold">
      Attach Cost Access Policy
    </h2>

    {/* IMAGE */}
    <img
      src={step7img}
      className="rounded-xl border border-gray-700"
      alt="Select policy checkbox"
    />

    {/* OPTION 1 */}
    <div className="bg-white/5 border border-gray-700 rounded-xl p-4 space-y-2">

      <p className="text-sm text-gray-300">
        <b>Recommended:</b> Search for
        <span className="text-blue-400">AWSBillingReadOnlyAccess </span>
      </p>

      <p className="text-xs text-gray-400">
         When you see the policy, <b>tick the checkbox on the left side</b> and then click <b>Next</b>.
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 text-xs text-blue-300">
        ✔ Select the checkbox next to the policy name (left side)
      </div>

    </div>

    {/* HELP BUTTON */}
    <div className="text-center">
      <button
        onClick={onNeedHelp}
        className="text-xs text-blue-400 underline hover:text-blue-300"
      >
        Can't find this policy?
      </button>
    </div>



  </div>
);

export default Step8Policy;