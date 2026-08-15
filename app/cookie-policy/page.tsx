export const metadata = { title: 'Cookie Policy | Reta Pharma' };
export default function CookiePolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Cookie Policy</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 prose prose-slate max-w-none">
          <h3>What Are Cookies</h3>
          <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
          <h3>How We Use Cookies</h3>
          <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
          <h3>The Cookies We Set</h3>
          <ul>
            <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
            <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact.</li>
            <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
