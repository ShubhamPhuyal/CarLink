<div className='bg-[#FBFBFF]'>
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-20 my-1">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src='carlink.png'/>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-8 font-bold">
              <a href="/new-car" className="text-gray-700">Book Cars</a>
              <a href="/rent-car" className="text-gray-700">Car Parts</a>
              <a href="/car-parts" className="text-gray-700">Rent Cars</a>
              <a href="/car-review" className="text-gray-700">News</a>
              <a href="/compare-car" className="text-gray-700">Compare Car</a>
              <a href="/compare-car" className="text-gray-700">Chat</a>
            </div>
            
            <button className="px-6 py-2 border border-gray-300 rounded">
              Login
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-white to-blue-100">
        <div className="container mx-auto px-20 py-12">
          <div className="flex justify-between items-center">
            {/* Left Content */}
            <div className="w-[600px]">
              <h1 className="text-6xl font-bold mb-6">
                Find, book and<br />
                rent a car <span className="text-blue-600">Easily</span>
              </h1>
              <p className="text-gray-600 text-xl mb-12">
                Get a car wherever and whenever you need it with your IOS and Android device.
              </p>
              
              {/* Search Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  FIND YOUR DREAM CARS
                </h2>
                
                <div className="mb-6">
                  <button className="px-8 py-3 bg-gray-800 text-white mr-4">
                    By Budget
                  </button>
                  <button className="px-8 py-3 bg-white text-gray-800">
                    By Brand
                  </button>
                </div>
                
                <div className="flex items-center">
                  <select className="w-64 px-4 py-3 border mr-4">
                    <option>Select budget</option>
                  </select>
                  <select className="w-64 px-4 py-3 border mr-4">
                    <option>Select Vehicle Types</option>
                  </select>
                  <button className="px-12 py-3 bg-blue-600 text-white">
                    Search
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-[700px]">
              <img
                src="header car.png"
                alt="Blue Sports Car"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Cars Section */}
      <div className="container mx-auto px-20 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          LATEST CAR
        </h2>

        <div className="grid grid-cols-4 gap-8 rounded-md">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.1)]">

              <div className="mb-4">
                <img 
                  src="card.png"
                  alt="KIA PICCANTO"
                  className="w-full"
                />
              </div>
              <h3 className="font-semibold mb-2">KIA PICCANTO</h3>
              <p className="text-gray-600 text-sm mb-4">
                Price: NPRs 34.99 - 36.00 lakhs
              </p>
              <button className="w-full py-2 text-blue-600 border border-blue-600 rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white">
                Book Now
              </button>

            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-20">
          <div className="grid grid-cols-4 gap-16">
            {/* Logo Column */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
              <img 
                  src="whitelogo.png"
                  alt="Logo" />
              </div>
            </div>

            {/* Empresa Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Empresa</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Soluciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Insights</a></li>
              </ul>
            </div>

            {/* First Categorías Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Categorías</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white">Contratar Talento</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Desarrollar Talento</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Herramientas de Gamificación</a></li>
              </ul>
            </div>

            {/* Second Categorías Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Categorías</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white">Competencias Digitales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Competencias Comerciales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Liderazgo</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>