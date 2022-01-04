const defaultConstraints = {
  audio: false,
  video: { width: 1280, height: 720, facingMode: "user" },
};

const useCapture = (container, constraints = defaultConstraints) => {
  const globals = {
    videoElement: null,
    containerElement: null,
    stream: null,
  };

  const setContainerElement = () =>
    (globals.containerElement = document.querySelector(container));
  const setStream = (stream) => (globals.stream = stream);
  const setVideoElement = () => (globals.videoElement = createVideoTag());
  const appendVideoToContainer = () =>
    globals.containerElement.appendChild(globals.videoElement);

  const setStreamInVideo = () => {
    if (globals.videoElement && "srcObject" in globals.videoElement) {
      globals.videoElement.srcObject = globals.stream;
    } else {
      globals.videoElement.src = window.URL.createObjectURL(globals.stream);
    }
  };

  const legacyGetUserMedia = (config) => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia;

    if (!getUserMedia) throw Error("BrowserNotSupported");
    else
      return new Promise((resolve, reject) =>
        getUserMedia.call(navigator, config, resolve, reject)
      );
  };

  const getUserMedia = (config) => {
    if (navigator.mediaDevices === undefined) navigator.mediaDevices = {};
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = legacyGetUserMedia;
    }

    return navigator.mediaDevices.getUserMedia(config);
  };

  const createVideoTag = () => {
    const video = document.createElement("video");
    video.setAttribute("autoplay", "true");
    video.setAttribute("playsinline", "true");
    return video;
  };

  const startCamera = async () => {
    const stream = await getUserMedia(constraints);
    setStream(stream);
  };

  const captureInit = async () => {
    await startCamera();
    setContainerElement();
    setVideoElement();
    setStreamInVideo();
    appendVideoToContainer();
    globals.videoElement.play();
  };

  const stopCapture = () => {
    if (globals.stream)
      globals.stream.getTracks().forEach((track) => track.stop());
    if (globals.containerElement && globals.videoElement)
      globals.containerElement.removeChild(globals.videoElement);
  };

  const switchCamera = async () => {
    stopCapture();
    constraints.video.facingMode =
      constraints.video.facingMode === "user" ? "environment" : "user";
    await captureInit();
  };

  const getCameraPermission = async () => {
    if (navigator.permissions) {
      const response = await navigator.permissions.query({ name: 'camera' });
      if (response.state === 'denied') throw new Error('PermissionDenied');
    }
  }

  return { captureInit, stopCapture, switchCamera };
};

export { useCapture };