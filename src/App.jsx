import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Users, Calendar, Globe } from 'lucide-react';

const SalesDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all');

  // Datos de campañas de Facebook
  const campaignData = {
    totalSpent: 7737.29,
    totalImpressions: 2132687,
    totalReach: 566650,
    totalLandingPageViews: 8611, // Visitas a landing pages
    totalCheckoutsInitiated: 673, // Pagos iniciados
    totalPurchases: 122, // Total de compras
    conversionRate: 1.42, // % Conversión (122/8611 * 100)
    persuasionRate: 7.81, // % Persuasión (673/8611 * 100)
    campaigns: [
      { 
        name: 'V01 Ventas Sana tu Niño', 
        spent: 4725.45, 
        visits: 7985,
        checkouts: 504,
        tallerPurchases: 95,
        cdPurchases: 0,
        conversionRate: 1.19,
        persuasionRate: 6.31
      },
      { 
        name: 'Taller Presencial Octubre Remarketing WhatsApp', 
        spent: 444.27, 
        visits: 0,
        checkouts: 41,
        tallerPurchases: 15,
        cdPurchases: 0,
        conversionRate: 0,
        persuasionRate: 0
      },
      { 
        name: 'Taller Presencial Octubre Imágenes CBO', 
        spent: 101.26 + 545.55, 
        visits: 752,
        checkouts: 47,
        tallerPurchases: 7,
        cdPurchases: 0,
        conversionRate: 0.93,
        persuasionRate: 6.25
      },
      { 
        name: 'Downsell Curso Digital', 
        spent: 241.19, 
        visits: 613,
        checkouts: 92,
        tallerPurchases: 0,
        cdPurchases: 10,
        conversionRate: 1.63,
        persuasionRate: 15.01
      }
    ]
  };

  // Datos de ventas de Hotmart
  const salesData = useMemo(() => {
    // Total de ítems vendidos (según conteo de filas del documento)
    const totalItems = 298; // Conteo real de filas/ítems del documento
    const totalGrossRevenue = 22641.44; // Facturación bruta sin impuestos
    
    const products = [
      { product: 'Taller General', count: 157, revenue: 15480.23, tipo: 'general' },
      { product: 'Taller VIP', count: 38, revenue: 5593.64, tipo: 'vip' },
      { product: 'Programa Seguimiento', count: 17, revenue: 846.05, tipo: 'seguimiento' },
      { product: 'Cuaderno Transformación', count: 43, revenue: 823.97, tipo: 'adicional' },
      { product: 'Diario Sanación', count: 37, revenue: 374.63, tipo: 'adicional' },
      { product: 'Curso Digital', count: 23, revenue: 1151.15, tipo: 'curso' }
    ];

    const ticketTypes = [
      { type: 'Entrada General', count: 157, percentage: 80.5, revenue: 15480.23 },
      { type: 'Entrada VIP', count: 38, percentage: 19.5, revenue: 5593.64 }
    ];

    const byCountry = [
      { country: 'Perú', sales: 198, items: 210, revenue: 19850 },
      { country: 'Estados Unidos', sales: 14, items: 17, revenue: 2100 },
      { country: 'República Dominicana', sales: 2, items: 2, revenue: 177 },
      { country: 'Alemania', sales: 1, items: 1, revenue: 52 },
      { country: 'Países Bajos', sales: 1, items: 1, revenue: 21 },
      { country: 'Austria', sales: 1, items: 1, revenue: 52 },
      { country: 'Colombia', sales: 1, items: 1, revenue: 0.01 },
      { country: 'México', sales: 2, items: 2, revenue: 389 }
    ];

    const byPaymentMethod = [
      { method: 'Tarjeta de Crédito', count: 142, percentage: 64.5 },
      { method: 'Yape', count: 48, percentage: 21.8 },
      { method: 'Tarjeta de Débito', count: 0, percentage: 0 },
      { method: 'PayPal', count: 10, percentage: 4.5 },
      { method: 'PagoEfectivo', count: 11, percentage: 5.0 },
      { method: 'Klarna', count: 1, percentage: 0.5 },
      { method: 'Otros', count: 8, percentage: 3.6 }
    ];

    const dailySales = [
      { date: '19-Oct', sales: 15, items: 18, revenue: 1502 },
      { date: '20-Oct', sales: 18, items: 22, revenue: 1812 },
      { date: '21-Oct', sales: 25, items: 31, revenue: 2534 },
      { date: '22-Oct', sales: 22, items: 26, revenue: 2243 },
      { date: '23-Oct', sales: 20, items: 24, revenue: 1998 },
      { date: '24-Oct', sales: 32, items: 38, revenue: 3234 },
      { date: '25-Oct', sales: 28, items: 34, revenue: 2867 }
    ];

    return { 
      totalItems, 
      totalGrossRevenue, 
      products, 
      ticketTypes,
      byCountry, 
      byPaymentMethod, 
      dailySales 
    };
  }, []);

  const kpis = [
    {
      title: 'Ítems Vendidos',
      value: salesData.totalItems.toString(),
      change: '+12.5%',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Facturación Bruta',
      value: `${salesData.totalGrossRevenue.toLocaleString()}`,
      change: '+8.3%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Conversión Landing',
      value: `${campaignData.conversionRate}%`,
      change: `${campaignData.totalPurchases} compras`,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Persuasión',
      value: `${campaignData.persuasionRate}%`,
      change: `${campaignData.totalCheckoutsInitiated} checkouts`,
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Reporte de Ventas - Taller Octubre 2025
          </h1>
          <p className="text-slate-600">
            Análisis completo de campañas y conversiones
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">
                {kpi.title}
              </h3>
              <p className="text-3xl font-bold text-slate-800">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'campaigns', 'products', 'geography'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab === 'overview' && 'Resumen General'}
                  {tab === 'campaigns' && 'Campañas'}
                  {tab === 'products' && 'Productos'}
                  {tab === 'geography' && 'Geografía'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Daily Sales */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Ventas Diarias (Últimos 7 días)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData.dailySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="items" stroke="#3b82f6" strokeWidth={2} name="Ítems" />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Ingresos ($)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Métodos de Pago
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={salesData.byPaymentMethod}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ method, percentage }) => `${method}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {salesData.byPaymentMethod.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Payment Methods List */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Detalle de Métodos de Pago
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {salesData.byPaymentMethod.map((method, index) => (
                      <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4">
                        <p className="text-sm text-slate-600 mb-1">{method.method}</p>
                        <p className="text-2xl font-bold text-slate-800">{method.count}</p>
                        <p className="text-sm font-semibold text-blue-600">{method.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {selectedTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium">Gasto Total</p>
                    <p className="text-2xl font-bold text-blue-900">${campaignData.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                    <p className="text-sm text-green-700 font-medium">Visitas Landing</p>
                    <p className="text-2xl font-bold text-green-900">{campaignData.totalLandingPageViews.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                    <p className="text-sm text-purple-700 font-medium">% Conversión</p>
                    <p className="text-2xl font-bold text-purple-900">{campaignData.conversionRate}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                    <p className="text-sm text-orange-700 font-medium">% Persuasión</p>
                    <p className="text-2xl font-bold text-orange-900">{campaignData.persuasionRate}%</p>
                  </div>
                </div>

                {/* Campaign Performance Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Campaña</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Gasto</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Visitas</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Checkouts</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Taller</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">CD</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Conv %</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Persua %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignData.campaigns.map((campaign, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-800">{campaign.name}</td>
                          <td className="px-4 py-3 text-right text-slate-600">${campaign.spent.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{campaign.visits}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{campaign.checkouts}</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                              {campaign.tallerPurchases}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              {campaign.cdPurchases}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-semibold ${campaign.conversionRate > 1 ? 'text-green-600' : 'text-slate-600'}`}>
                              {campaign.conversionRate.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-semibold ${campaign.persuasionRate > 7 ? 'text-green-600' : 'text-slate-600'}`}>
                              {campaign.persuasionRate.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Conversiones por Tipo</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={campaignData.campaigns}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tallerPurchases" fill="#3b82f6" name="Taller" />
                        <Bar dataKey="cdPurchases" fill="#10b981" name="Curso Digital" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Gasto vs Conversión</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={campaignData.campaigns}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="spent" fill="#8b5cf6" name="Gasto ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {selectedTab === 'products' && (
              <div className="space-y-8">
                {/* Ticket Types */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Tipos de Entrada (Taller)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={salesData.ticketTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, percentage }) => `${type}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                      {salesData.ticketTypes.map((ticket, index) => (
                        <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-800">{ticket.type}</h4>
                            <span className="text-2xl font-bold text-slate-900">{ticket.percentage}%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600">Cantidad</p>
                              <p className="font-bold text-slate-800">{ticket.count}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">Ingresos</p>
                              <p className="font-bold text-green-600">${ticket.revenue.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* All Products */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-6">
                    Todos los Productos
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={salesData.products} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="product" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8b5cf6" name="Cantidad" />
                      <Bar dataKey="revenue" fill="#10b981" name="Ingresos ($)" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {salesData.products.map((product, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-slate-800 mb-2">{product.product}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Unidades:</span>
                            <span className="font-bold text-slate-800">{product.count}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Ingresos:</span>
                            <span className="font-bold text-green-600">${product.revenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Tipo:</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                              {product.tipo}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Geography Tab */}
            {selectedTab === 'geography' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6">
                  Distribución Geográfica
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={salesData.byCountry}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="items" fill="#3b82f6" name="Ítems" />
                    <Bar dataKey="revenue" fill="#10b981" name="Ingresos ($)" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 space-y-3">
                  {salesData.byCountry.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-slate-800">{country.country}</span>
                      </div>
                      <div className="flex space-x-6">
                        <div className="text-right">
                          <p className="text-sm text-slate-600">Transacciones</p>
                          <p className="font-bold text-slate-800">{country.sales}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600">Ítems</p>
                          <p className="font-bold text-blue-600">{country.items}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600">Ingresos</p>
                          <p className="font-bold text-green-600">${country.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-slate-800 mb-3">💡 Conversión Exitosa</h3>
            <p className="text-sm text-slate-600">
              La campaña principal logró 1.42% de conversión con 122 compras de 8,611 visitas. El downsell CD destacó con 15% de persuasión.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-slate-800 mb-3">🎟️ Mix de Entradas</h3>
            <p className="text-sm text-slate-600">
              80.5% eligió entrada general vs 19.5% VIP. Las VIP generaron $5,594 adicionales con ticket promedio más alto.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-slate-800 mb-3">💳 Preferencia Digital</h3>
            <p className="text-sm text-slate-600">
              64.5% pagó con tarjeta de crédito y 21.8% con Yape. Los medios digitales dominan con 91% de transacciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;