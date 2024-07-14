import { usDollar } from "@/utils/currency";
import { useEffect, useState } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AddVehicleButton from "@/components/AddVehicleButton";

const BrowseVehicles = () => {
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [years, _] = useState([2020, 2019, 2018, 2017, 2016, 2015]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [trims, setTrims] = useState([]);

  useEffect(() => {
    setSelectedMake("");
    setTrims([]);

    const fetchMakes = async () => {
      if (!selectedYear) {
        setMakes([]);
        return;
      }

      const response = await fetch(`/api/makes?year=${selectedYear}`);
      const { data } = await response.json();
      setMakes(data);
    };

    fetchMakes();
  }, [selectedYear]);

  useEffect(() => {
    setSelectedModel("");
    setTrims([]);

    const fetchModels = async () => {
      if (!selectedMake) {
        setModels([]);
        return;
      }

      const response = await fetch(
        `/api/models?verbose=yes&make=${selectedMake}&year=${selectedYear}`,
      );
      const { data } = await response.json();
      setModels(data);
    };

    fetchModels();
  }, [selectedMake]);

  const formDisabled = Boolean(
    !selectedYear || !selectedMake || !selectedModel,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTrims([]);

    try {
      const response = await fetch(
        `/api/trims?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}&verbose=yes`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trims");
      }
      const { data } = await response.json();
      setTrims(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Approved Vehicle List</h4>

      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex-row"
          style={{ gap: "20px" }}
        >
          <div className="one-fourth" style={{ flex: 1 }}>
            <label htmlFor="year">Year</label>
            <select
              name="year"
              id="year"
              value={selectedYear}
              onChange={(e) => {
                setSelectedMake("");
                setSelectedModel("");
                setTrims([]);
                setSelectedYear(e.currentTarget.value);
              }}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="one-fourth" style={{ flex: 1 }}>
            <label htmlFor="makes">Make</label>
            <select
              name="makes"
              id="makes"
              value={selectedMake}
              disabled={!Boolean(makes.length)}
              onChange={(e) => {
                setSelectedModel("");
                setTrims([]);
                setSelectedMake(e.currentTarget.value);
              }}
            >
              <option value="">Select Make</option>
              {makes.map((make) => (
                <option key={make.id}>{make.name}</option>
              ))}
            </select>
          </div>

          <div className="one-fourth" style={{ flex: 1 }}>
            <label htmlFor="models">Models</label>
            <select
              name="models"
              id="models"
              value={selectedModel}
              disabled={!Boolean(models.length)}
              onChange={(e) => {
                setTrims([]);
                setSelectedModel(e.currentTarget.value);
              }}
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model.id}>{model.name}</option>
              ))}
            </select>
          </div>

          <div
            className="one-fourth"
            style={{ flex: 0, alignSelf: "flex-end" }}
          >
            <button disabled={formDisabled}>Find</button>
          </div>
        </form>
      </div>

      {loading && <p>Loading...</p>}

      {trims.length > 0 && (
        <div className="contain-table">
          <table className="striped-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Trim</th>
                <th>Description</th>
                <th>MSRP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trims.map((trim) => (
                <tr key={trim.id}>
                  <td>{trim.year}</td>
                  <td>{trim.make_model.make.name}</td>
                  <td>{trim.make_model.name}</td>
                  <td>{trim.name}</td>
                  <td>{trim.description}</td>
                  <td>{usDollar.format(trim.msrp)}</td>
                  <td className="text-right">
                    <button
                      className="muted-button"
                      aria-label="View Details"
                      onClick={() => window.open(`/vehicles/${trim.id}`)}
                    >
                      ℹ
                    </button>{" "}
                    <AddVehicleButton trimId={trim.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export { BrowseVehicles };
export default BrowseVehicles;
