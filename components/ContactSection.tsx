import { ContactForm } from './ContactForm';

export const ContactSection = () => {
  return (
    <div className="bg-primary py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="mb-8">
              <img 
                src="https://plus.unsplash.com/premium_photo-1675842663249-a8b70103dbaa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Contact Us" 
                className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-lg">
              We're here to help you with your next project. Fill out the form and we'll get back to you shortly.
            </p>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase font-bold tracking-wider">Email</p>
                    <p className="text-white font-medium">info@optimantix.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase font-bold tracking-wider">Phone (India)</p>
                    <p className="text-white font-medium">+91 9910343016</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-xl">🇺🇸</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase font-bold tracking-wider">Phone (US)</p>
                    <p className="text-white font-medium">+1 802 995 2844</p>
                  </div>
                </div>
            </div>
          </div>
          <div className="lg:pl-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
