
// "use client";
// import React, { useCallback, useMemo, useState } from "react";
// import dynamic from "next/dynamic";
// import debounce from "lodash.debounce";
// import {
//   RotateCcw,
//   RotateCw,
//   ArrowUp,
//   ArrowDown,
//   Upload,
// } from "lucide-react";
// import getCroppedImageBlobUrl from "../utils/cropImage";

// // Lazy load Cropper
// const Cropper = dynamic(() => import("react-easy-crop"), { ssr: false });

// // 🔹 Reusable Slider
// function CustomSlider({ label, value, min, max, step, onChange, gradient }) {
//   return (
//     <div className="flex flex-col space-y-1 w-full">
//       <label className="text-sm font-medium">{label}</label>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => onChange(Number(e.target.value))}
//         className={`w-full accent-blue-600 cursor-pointer ${gradient}`}
//       />
//       <span className="text-xs text-gray-500">{value}</span>
//     </div>
//   );
// }

// // 🔹 Reusable Button
// function RotateButton({ onClick, Icon, label }) {
//   return (
//     <button
//       onClick={onClick}
//       className="p-2 bg-gray-100 rounded flex flex-col items-center hover:cursor-pointer"
//     >
//       <Icon className="w-5 h-5" />
//       <span className="text-xs">{label}</span>
//     </button>
//   );
// }

// export default function ImageEditor({
//   initialImage = null,
//   mode = "cover",
//   onCancel = () => {},
//   onSave = () => {},
//   aspectPresets = [
//     { key: "square", label: "1:1", aspect: 1 },
//     { key: "standard", label: "4:3", aspect: 4 / 3 },
//     { key: "landscape", label: "16:9", aspect: 16 / 9 },
//     { key: "cover", label: "3:1", aspect: 3 / 1 },
//   ],
// }) {
//   const [activeTab, setActiveTab] = useState("crop");
//   const [imageSrc, setImageSrc] = useState(initialImage);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   // Aspect ratio
//   const [aspectKey, setAspectKey] = useState(mode === "avatar" ? "square" : "cover");
//   const [aspect, setAspect] = useState(
//     mode === "avatar" ? 1 : aspectPresets.find((p) => p.key === "cover")?.aspect || 3 / 1
//   );

//   // Filters
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [grayscale, setGrayscale] = useState(0);

//   const debouncedSetBrightness = useMemo(() => debounce(setBrightness, 60), []);
//   const debouncedSetContrast = useMemo(() => debounce(setContrast, 60), []);
//   const debouncedSetSaturation = useMemo(() => debounce(setSaturation, 60), []);
//   const debouncedSetGrayscale = useMemo(() => debounce(setGrayscale, 60), []);

//   const filterString = useMemo(
//     () =>
//       `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`,
//     [brightness, contrast, saturation, grayscale]
//   );

//   const rotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
//   const rotateRight = () => setRotation((r) => (r + 90) % 360);
//   const flipVertical = () => setRotation((r) => (r + 180) % 360);
//   const flipHorizontal = () => setRotation((r) => (r + 270) % 360);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setImageSrc(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // 🔹 Main Save
//   const handleSave = useCallback(async () => {
//     if (!imageSrc || !croppedAreaPixels) return;

//     let outputW, outputH;

//     if (mode === "avatar") {
//       outputW = 800;
//       outputH = 800;
//     } else if (mode === "cover") {
//       outputW = 1584;
//       outputH = 396;
//     } else {
//       // auto size = just crop
//       outputW = croppedAreaPixels.width;
//       outputH = croppedAreaPixels.height;
//     }

//     try {
//       const { blob, url } = await getCroppedImageBlobUrl({
//         imageSrc,
//         pixelCrop: croppedAreaPixels,
//         outputWidth: outputW,
//         outputHeight: outputH,
//         rotation,
//         filters: filterString,
//         mimeType: mode === "avatar" ? "image/png" : "image/jpeg",
//         quality: 0.92,
//       });
//       onSave({ blob, url, type: aspectKey });
//     } catch (err) {
//       console.error("Failed to export image:", err);
//     }
//   }, [imageSrc, croppedAreaPixels, rotation, filterString, onSave, aspectKey, mode]);

//   return (
//     <div className="p-4 flex flex-col gap-6">
//       {/* Image Editor */}
//       <div className="relative w-full h-96 bg-black/60 rounded">
//         {imageSrc ? (
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             rotation={rotation}
//             aspect={aspect}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
//             style={{
//               containerStyle: { filter: filterString },
//             }}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             Upload or drag an image
//           </div>
//         )}
//       </div>

//       <div className="flex justify-end">
//         <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
//           <Upload className="w-5 h-5" />
//           <span>Change Image</span>
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b">
//         {["crop", "filters", "adjust"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 text-sm font-medium ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-600 text-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Crop Tab */}
//       {activeTab === "crop" && (
//         <div className="space-y-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="flex gap-2">
//               {aspectPresets.map((p) => (
//                 <button
//                   key={p.key}
//                   onClick={() => {
//                     setAspectKey(p.key);
//                     setAspect(p.aspect);
//                   }}
//                   className={`px-3 py-1 rounded ${
//                     aspectKey === p.key ? "bg-blue-600 text-white" : "bg-gray-100"
//                   }`}
//                 >
//                   {p.label}
//                 </button>
//               ))}
//             </div>
//             <div className="flex gap-3">
//               <RotateButton onClick={rotateLeft} Icon={RotateCcw} label="Left" />
//               <RotateButton onClick={rotateRight} Icon={RotateCw} label="Right" />
//               <RotateButton onClick={flipVertical} Icon={ArrowUp} label="Top" />
//               <RotateButton onClick={flipHorizontal} Icon={ArrowDown} label="Bottom" />
//             </div>
//           </div>
//           <CustomSlider label="Zoom" value={zoom} min={1} max={3} step={0.01} onChange={setZoom} />
//         </div>
//       )}

//       {/* Filters Tab */}
//       {activeTab === "filters" && (
//         <div className="flex flex-wrap gap-6">
//           {[
//             { name: "Original", filter: "" },
//             { name: "Studio", filter: "contrast(120%) brightness(105%)" },
//             { name: "Spotlight", filter: "brightness(120%) saturate(110%)" },
//             { name: "Prime", filter: "contrast(110%) saturate(120%)" },
//             { name: "Classic", filter: "grayscale(50%)" },
//             { name: "Edge", filter: "contrast(150%)" },
//           ].map((f, i) => (
//             <button
//               key={i}
//               className="flex flex-col items-center"
//               onClick={() => {
//                 setBrightness(100);
//                 setContrast(100);
//                 setSaturation(100);
//                 if (f.filter.includes("contrast"))
//                   setContrast(parseInt(f.filter.match(/\d+/)[0]));
//                 if (f.filter.includes("brightness"))
//                   setBrightness(parseInt(f.filter.match(/\d+/)[0]));
//                 if (f.filter.includes("saturate"))
//                   setSaturation(parseInt(f.filter.match(/\d+/)[0]));
//               }}
//             >
//               <img
//                 src={imageSrc}
//                 className="w-16 h-16 object-cover rounded shadow"
//                 style={{ filter: f.filter }}
//               />
//               <span className="text-xs mt-1">{f.name}</span>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Adjust Tab */}
//       {activeTab === "adjust" && (
//         <div className="space-y-4">
//           <CustomSlider
//             label="Brightness"
//             value={brightness}
//             min={50}
//             max={150}
//             step={1}
//             onChange={setBrightness}
//             gradient="bg-gradient-to-r from-black via-gray-500 to-white"
//           />
//           <CustomSlider
//             label="Contrast"
//             value={contrast}
//             min={50}
//             max={150}
//             step={1}
//             onChange={setContrast}
//             gradient="bg-gradient-to-r from-gray-200 to-gray-900"
//           />
//           <CustomSlider
//             label="Saturation"
//             value={saturation}
//             min={50}
//             max={200}
//             step={1}
//             onChange={setSaturation}
//             gradient="bg-gradient-to-r from-gray-400 via-green-400 to-red-500"
//           />
//           <CustomSlider
//             label="Grayscale"
//             value={grayscale}
//             min={0}
//             max={100}
//             step={1}
//             onChange={setGrayscale}
//             gradient="bg-gradient-to-r from-gray-100 to-black"
//           />
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex gap-2 mt-4">
//         <button
//           onClick={onCancel}
//           className="flex-1 py-2 rounded-3xl bg-gray-200 text-gray-700"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSave}
//           className="flex-1 py-2 rounded-3xl bg-blue-600 text-white"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }


// components/ImageEditor.jsx
"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RotateCcw, RotateCw } from "lucide-react";
import getCroppedImageBlobUrl from "../utils/cropImage";

// lazy load
const Cropper = dynamic(() => import("react-easy-crop"), { ssr: false });

const aspectPresets = [
  { key: "square", label: "1:1", aspect: 1 },
  { key: "standard", label: "4:3", aspect: 4 / 3 },
  { key: "landscape", label: "16:9", aspect: 16 / 9 },
  { key: "cover", label: "3:1", aspect: 3 / 1 },
];

const ImageEditor = forwardRef(({ initialImage = null, mode = "auto", activeStep = 0 }, ref) => {
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // aspect handling: avatar -> square else default cover aspect
  const defaultAspectKey = mode === "avatar" ? "square" : "cover";
  const [aspectKey, setAspectKey] = useState(defaultAspectKey);
  const [aspect, setAspect] = useState(
    mode === "avatar" ? 1 : aspectPresets.find((p) => p.key === defaultAspectKey)?.aspect || 3
  );

  // Adjust filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

  useEffect(() => {
    setImageSrc(initialImage);
    // reset states when a new image opens
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setGrayscale(0);
  }, [initialImage]);


  useEffect(() => {
  if (!imageSrc) return;

  const applyStepChanges = async () => {
    // अगर crop complete है तो image regenerate करो
    if (activeStep === 1 && croppedAreaPixels) {
      const res = await getCroppedImageBlobUrl({
        imageSrc,
        pixelCrop: croppedAreaPixels,
        rotation,
        filters: filterString,
        outputWidth: mode === "avatar" ? 800 : 1584,
        outputHeight: mode === "avatar" ? 800 : 396,
      });

      if (res?.url) {
        setImageSrc(res.url); // ✅ अब step 1 में cropped image दिखेगी
      }
    }

    // Step 2 जाने से पहले filter image save करो
    if (activeStep === 2) {
      const res = await getCroppedImageBlobUrl({
        imageSrc,
        pixelCrop: { x: 0, y: 0, width: 800, height: 800 }, // full image
        rotation,
        filters: filterString,
      });

      if (res?.url) {
        setImageSrc(res.url); // ✅ अब adjustments में filtered image दिखेगी
      }
    }
  };

  applyStepChanges();
}, [activeStep]);


  const filterString = useMemo(
    () => `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`,
    [brightness, contrast, saturation, grayscale]
  );

  const rotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);

  const onCropComplete = (_, pixels) => setCroppedAreaPixels(pixels || null);

  // Expose exportImage so parent/modal can call it
  useImperativeHandle(ref, () => ({
    async exportImage() {
      if (!imageSrc) return null;

      // ensure we have pixelCrop; if not, fallback to full image
      let pixelCrop = croppedAreaPixels;
      // if missing crop area, build full-image crop using actual image dims
      if (!pixelCrop) {
        // load real image to get dims
        const img = await loadImage(imageSrc);
        pixelCrop = { x: 0, y: 0, width: img.width, height: img.height };
      }

      // pick output size by mode
      let outputWidth = null;
      let outputHeight = null;
      if (mode === "avatar") {
        outputWidth = 800;
        outputHeight = 800;
      } else if (mode === "cover") {
        outputWidth = 1584;
        outputHeight = 396;
      } // else null -> use cropped size

      try {
        const res = await getCroppedImageBlobUrl({
          imageSrc,
          pixelCrop,
          rotation,
          filters: filterString,
          outputWidth,
          outputHeight,
          mimeType: mode === "avatar" ? "image/png" : "image/jpeg",
          quality: 0.92,
        });
        return res; // { blob, url }
      } catch (err) {
        console.error("Export failed", err);
        return null;
      }
    },
  }));

  // small UI components (sliders/buttons)
  return (
    <div className="p-3 flex flex-col gap-3">
      {/* Canvas */}
      <div className="relative w-full h-72 ack/60 rounded overflow-hidden">
        {imageSrc ? (
          activeStep === 0 ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{ containerStyle: { filter: filterString } }}
            />
          ) : (
            // show plain image with filters applied (no thumbnail strip)
            <img src={imageSrc} alt="editing" className="w-full h-full object-contain" style={{ filter: filterString }} />
          )
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>

      {/* Controls per step */}
      {activeStep === 0 && (
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {aspectPresets.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setAspectKey(p.key);
                  setAspect(p.aspect);
                }}
                className={`px-3 py-1 hover:cursor-pointer rounded ${aspectKey === p.key ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
              >
                {p.label}
              </button>
            ))}

          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button onClick={rotateLeft} className="p-2 hover:cursor-pointer  bg-gray-600 text-white rounded">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button onClick={rotateRight} className="p-2 hover:cursor-pointer bg-gray-600 text-white rounded">
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
            <div className="w-1/2">
              <label className="text-sm text-white">Zoom</label>
             <input
  type="range"
  min={1}
  max={3}
  step={0.01}
  value={zoom}
  onChange={(e) => setZoom(Number(e.target.value))}
  className="
    w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer
    accent-blue-500
  "
/>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="space-y-3">
          {/* Filters presets (no thumbnails) — clicking changes sliders */}
          <div className="flex gap-3 flex-wrap">
            {[
  { name: "Original", preset: null },
  { name: "Studio", preset: { contrast: 120, brightness: 105, saturation: 110 } },
  { name: "Spot", preset: { brightness: 120, saturation: 110 } },
  { name: "Classic", preset: { grayscale: 50 } },
  { name: "Warm", preset: { brightness: 110, saturation: 120, contrast: 105 } },
  { name: "Cool", preset: { brightness: 95, saturation: 90, contrast: 110 } },
  { name: "Vintage", preset: { contrast: 90, brightness: 105, saturation: 80, grayscale: 20 } },
  { name: "Mono", preset: { grayscale: 100 } },
].map((p, i) => (
               <button
      key={i}
      onClick={() => {
        if (!p.preset) {
          setBrightness(100);
          setContrast(100);
          setSaturation(100);
          setGrayscale(0);
        } else {
          setBrightness(p.preset.brightness ?? 100);
          setContrast(p.preset.contrast ?? 100);
          setSaturation(p.preset.saturation ?? 100);
          setGrayscale(p.preset.grayscale ?? 0);
        }
      }}
      className="bg-transparent text-white hover:cursor-pointer rounded"
      type="button"
    >
      <img
        src={imageSrc}
        alt={p.name}
        className="w-12 h-12 object-cover rounded shadow"
        style={{
          filter: p.preset
            ? `brightness(${p.preset.brightness ?? 100}%) contrast(${p.preset.contrast ?? 100}%) saturate(${p.preset.saturation ?? 100}%) grayscale(${p.preset.grayscale ?? 0}%)`
            : "none",
        }}
      />
      <span className="text-[10px]">{p.name}</span>
    </button>
            ))}
          </div>

          {/* <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-xs text-white mb-2">Brightness</span>
              <input type="range" min={50} max={150} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
            </label>
            <label className="flex flex-col">
              <span className="text-xs text-white mb-2">Contrast</span>
              <input type="range" min={50} max={150} value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
            </label>
            <label className="flex flex-col">
              <span className="text-xs text-white mb-2">Saturation</span>
              <input type="range" min={50} max={200} value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} />
            </label>
            <label className="flex flex-col">
              <span className="text-xs text-white mb-2">Grayscale</span>
              <input type="range" min={0} max={100} value={grayscale} onChange={(e) => setGrayscale(Number(e.target.value))} />
            </label>
          </div> */}
        </div>
      )}
{activeStep === 2 && (
  <div className="space-y-3">
    <h5 className=" text-white font-semibold">Final adjustments</h5>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Brightness */}
      <div>
        <div className="text-xs mb-1 text-gray-300">Brightness</div>
        <input
          type="range"
          min={50}
          max={150}
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Contrast */}
      <div>
        <div className="text-xs mb-1 text-gray-300">Contrast</div>
        <input
          type="range"
          min={50}
          max={150}
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Saturation */}
      <div>
        <div className="text-xs mb-1 text-gray-300">Saturation</div>
        <input
          type="range"
          min={50}
          max={200}
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Grayscale */}
      <div>
        <div className="text-xs mb-1 text-gray-300">Grayscale</div>
        <input
          type="range"
          min={0}
          max={100}
          value={grayscale}
          onChange={(e) => setGrayscale(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
});

export default ImageEditor;

// helper
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}
