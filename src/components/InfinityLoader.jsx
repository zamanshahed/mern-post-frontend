import { DNA } from "react-loader-spinner";

const InfinityLoader = ({ size = 45 }) => {
  return (
    <div className="flex items-center justify-center gap-4 w-full p-5">
      <DNA
        visible={true}
        height={size}
        width={size}
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <span
        style={{
          fontSize: size / 2.5,
        }}
        className="text-cyan-400 font-medium space-grotesk"
      >
        Loading...
      </span>
    </div>
  );
};

export default InfinityLoader;
