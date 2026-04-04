const VideoBlock = ({ src, poster, autoPlay = false }) => {
  return (
    <div className="video-block">
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default VideoBlock;
