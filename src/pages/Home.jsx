import PostGrid from "./PostGrid";

const Home = () => {
  return (
    <div className="bg-[#0C0A25] text-white min-h-[calc(100vh-57px)]">
      <div className="max-w-[1280px] w-full mx-auto px-5 pt-[120px]">
        <div className="flex items-center justify-between pb-12">
          <h1 className="text-5xl font-bold max-w-[280px] space-grotesk">
            Our Recent Blogs
          </h1>
          <p className="max-w-[600px] w-full space-grotesk text-sm">
            We follow agile methodology to deliver a high quality task to meet
            established deadline.
          </p>
        </div>
        <PostGrid />
      </div>
    </div>
  );
};

export default Home;
