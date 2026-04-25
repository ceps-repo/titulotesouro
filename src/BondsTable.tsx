import React, { useEffect, useState } from "react";

interface Bond {
  nomeTitulo: string;
  vencimentoTitulo: string;
  vencimento: string;
  precoUnitario: string;
  anulRedRate: string;
}

const fetchBonds = async (): Promise<Bond[]> => {
  const res = await fetch(
    "/api-tesouro/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json"
  );
  const data = await res.json();
  const bonds = data?.response?.TrsrBdTradgList || data?.TrsrBdTradgList || [];
  return bonds.map((item: any) => {
    const bond = item.TrsrBd;
    return {
      nomeTitulo: bond.nm,
      vencimentoTitulo: bond.mtrtyDt,
      vencimento: bond.mtrtyDt,
      precoUnitario: bond.untrRedVal,
      anulRedRate: bond.anulRedRate,
    };
  });
};

const BondsTable: React.FC = () => {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBonds()
      .then((b) => {
        setBonds(b);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erro ao carregar os dados');
        setLoading(false);
      });
  }, []);

  // Filtra os títulos baseado no termo de busca
  const filteredBonds = bonds.filter((bond) =>
    bond.nomeTitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bond.vencimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bond.anulRedRate.toString().includes(searchTerm.toLowerCase()) ||
    bond.precoUnitario.toString().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-8">Carregando...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Erro: {error}</div>;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Campo de busca */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar títulos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-lg border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencimento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taxa Anual
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço Unitário
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBonds.map((bond, idx) => (
              <tr key={bond.nomeTitulo + bond.vencimentoTitulo + idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {bond.nomeTitulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bond.vencimento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bond.anulRedRate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R$ {bond.precoUnitario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBonds.length === 0 && (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            Nenhum título encontrado para a busca: "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default BondsTable;
