import Image from 'next/image';

const LoadingIcon = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Image
        src="/images/load.svg"
        alt="Loading..."
        className="animate-spin"
        width={64}
        height={64}
      />
    </div>
  );
};

export default LoadingIcon;
