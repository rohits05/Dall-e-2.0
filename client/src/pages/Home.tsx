import React, { ReactHTMLElement } from 'react';
import { Loader, Card, FormField } from '../components';

interface CardsType {
  data: any;
  title: string;
}
const RenderCards: React.FC<CardsType> = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post: any) => <Card key={post._id} {...post} />);
  }

  return <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>;
};
const Home: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [allPosts, setAllPosts] = React.useState<any>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedResults, setSearchedResults] = React.useState<any>(null);
  const [searchTimeout, setSearchTimeout] = React.useState<any>(null);

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase()),
        );
        setSearchedResults(searchResults);
      }, 500),
    );
  };
  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dall-e-ncr8.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginavtive and visually stuning images by DALL-E AI
        </p>
      </div>
      <div className="bg-[#6469ff] mt-5 text-center py-2 lg:px-4 border rounded-lg">
        <div
          className="p-2 bg-indigo-700 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Note
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            The back-end is deployed on free server, so wait for a moment to load the data.
          </span>
        </div>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts:"
          type="text"
          name="text"
          placeholder="Search for your community posts..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="No search results found" />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;