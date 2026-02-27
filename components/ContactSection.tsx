import { ContactForm } from './ContactForm';

export const ContactSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-dark-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We're here to help you with your next project. Fill out the form and we'll get back to you shortly.
            </p>
            <div className="space-y-4">
                <p><strong>Email:</strong> info@optimantix.com</p>
                <p><strong>Phone (India):</strong> +91 9910343016</p>
                <p><strong>Phone (US):</strong> +1 802 995 2844</p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
