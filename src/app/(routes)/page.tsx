
import ArtistsList from "@/components/global/artists/artists-list"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"

const Home = () => {
  return (
    <div className=" bg-white ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Artists & Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with talented performers and create unforgettable experiences.
              From musicians to entertainers, find the perfect artist for your event.
            </p>

            {/* CTA Buttons */}

            <Link href="/artists" className="mb-12 relative z-10 bg-white text-purple-900 hover:bg-gray-100 flex gap-2 items-center text-lg px-8 py-2 rounded-lg max-w-[200px] mx-auto">
              <Search className="w-5 h-5 mr-2" />
              Find Artists
            </Link>


            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 mr-2" />
                  <span className="text-3xl font-bold">500+</span>
                </div>
                <p className="text-gray-300">Verified Artists</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-6 h-6 mr-2" />
                  <span className="text-3xl font-bold">1000+</span>
                </div>
                <p className="text-gray-300">Events Hosted</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 mr-2" />
                  <span className="text-3xl font-bold">4.9</span>
                </div>
                <p className="text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Artists Section */}
      <ArtistsList />

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Why Choose Eventful?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Discovery</h3>
              <p className="text-gray-600">Find the perfect artist for your event with our advanced search and filtering options.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Talent</h3>
              <p className="text-gray-600">All our artists are professionally vetted and reviewed by real event organizers.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Booking</h3>
              <p className="text-gray-600">Book and manage your events with our simple, secure booking platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of event organizers who trust Eventful to find the perfect entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/artists/onboarding">
              <Button size="lg" variant="outline" className="border-white text-purple-500 hover:bg-white hover:text-purple-600">
                Join as an Artist
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home