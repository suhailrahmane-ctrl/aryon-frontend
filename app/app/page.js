export default function HomePage() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Welcome to Aryon</h2>
      <p className="text-gray-700 mb-6">
        The first global AI platform built in Afghanistan.  
        Chat, create images, and generate videos — all in one place.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {['Chat', 'Image', 'Video'].map((item) => (
          <div key={item} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
    }
