import './globals.css';

export const metadata = {
  title: 'الأقصى لزينة السيارات - فلاتر رياضي · الرياض',
  description: 'فلاتر رياضية، انتيكات هواء، عوادم، مكابح وزينة - تركيب داخل ورشتنا في حي الأمل.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="js">
      <body>{children}</body>
    </html>
  );
}
