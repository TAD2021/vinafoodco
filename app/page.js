export default function Home() {
  return (
    <div className="container mx-auto flex flex-wrap px-6">
      <aside className="aside w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4"></h2>
        <ul className="space-y-2"></ul>
      </aside>
      <div className="w-3/4 p-4">
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <img
            alt="Promotion Image"
            className="w-full rounded-lg"
            height="300"
            src="https://storage.googleapis.com/a1aa/image/4LQnYidfqk1JByC24jbfhjYZ9fiYoFwbl3d532LlmC4dRRLnA.jpg"
            width="600"
          />
        </div>
      </div>
    </div>
  );
}
