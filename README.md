# 💰 Mzuri Wealth Tracker

<div align="center">

![Mzuri Wealth Tracker](public/og-image.png)

**A powerful financial management application designed specifically for Kenyans**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://mzuriwealthtracker.netlify.app/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/BigTime5/Mzuri-Wealth-Tracker)
[![Netlify Status](https://img.shields.io/netlify/status?url=https://mzuriwealthtracker.netlify.app/&style=for-the-badge)](https://mzuriwealthtracker.netlify.app/)

[Live Demo](https://mzuriwealthtracker.netlify.app/) · [Report Bug](https://github.com/BigTime5/Mzuri-Wealth-Tracker/issues) · [Request Feature](https://github.com/BigTime5/Mzuri-Wealth-Tracker/issues)

</div>

---

## 🌟 Overview

Mzuri Wealth Tracker is a comprehensive financial management solution built for the Kenyan market. Track your income, manage expenses, visualize your financial health, and build wealth with confidence—all in Kenyan Shillings (KES).

**"Mzuri"** means "good" or "beautiful" in Swahili, reflecting our mission to help you build a beautiful financial future.

## ✨ Key Features

### 📊 **Financial Dashboard**
- Real-time net worth calculation and display
- Comprehensive breakdown of income vs. expenses
- Month-over-month financial trend analysis
- Visual graphs and charts for better insights

### 💵 **Income Management**
Track multiple income streams including:
- Salary and wages
- Business revenue
- Investment returns
- Freelance income
- Rental income
- Other sources

### 💳 **Expense Tracking**
Categorize your spending across:
- Rent and housing
- Utilities (electricity, water, internet)
- Transportation
- Food and groceries
- Entertainment
- Healthcare
- Education
- Savings and investments
- Custom categories

### 📈 **Visual Analytics**
- Interactive charts showing monthly net worth trends
- Income vs. expense comparison graphs
- Category-wise expense breakdown
- Historical data visualization

### 🔔 **Smart Notifications**
- Budget threshold alerts
- Overspending warnings
- Monthly financial summaries
- Goal achievement notifications

### 🌐 **Multi-Platform Support**
- Fully responsive design
- Optimized for mobile devices
- Desktop-friendly interface
- Progressive Web App (PWA) capabilities

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BigTime5/Mzuri-Wealth-Tracker.git
   cd Mzuri-Wealth-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**
   ```bash
   # Using Supabase CLI
   supabase db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🛠️ Built With

### Core Technologies
- **[React](https://react.dev/)** - UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend & Database
- **[Supabase](https://supabase.com/)** - Open-source Firebase alternative
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row-level security

### UI Components & Visualization
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set

### Additional Tools
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[React Router](https://reactrouter.com/)** - Client-side routing

## 📁 Project Structure

```
Mzuri-Wealth-Tracker/
├── public/                 # Static assets
│   ├── android-chrome-*.png
│   ├── apple-touch-icon.png
│   ├── manifest.webmanifest
│   └── og-image.png
├── src/
│   ├── components/        # Reusable React components
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # Third-party integrations
│   │   └── supabase/      # Supabase client & queries
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── supabase/
│   ├── migrations/        # Database migration files
│   └── config.toml        # Supabase configuration
└── ...config files
```

## 🎨 Features in Detail

### Dashboard
The main dashboard provides an at-a-glance view of your financial health:
- Current net worth (Total Income - Total Expenses)
- Monthly income summary
- Monthly expense summary
- Quick action buttons for adding transactions

### Transaction Management
- Add income and expense entries with ease
- Edit or delete existing transactions
- Assign categories for better organization
- Add notes and descriptions

### Analytics & Reporting
- Monthly trend charts showing net worth progression
- Category-wise expense distribution
- Income source breakdown
- Exportable reports for tax purposes

### Budget Control
- Set monthly budget limits for different categories
- Receive alerts when approaching or exceeding budgets
- Track budget utilization percentage

## 🔐 Security

- **Row-Level Security (RLS)** enabled on all database tables
- Secure authentication via Supabase Auth
- Environment variables for sensitive data
- HTTPS-only in production

## 🌍 Deployment

The application is deployed on [Netlify](https://www.netlify.com/) with continuous deployment from the main branch.

### Deploy Your Own

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/BigTime5/Mzuri-Wealth-Tracker)

### Manual Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 PWA Support

Mzuri Wealth Tracker can be installed as a Progressive Web App on your device:

1. Visit the site on your mobile browser
2. Tap "Add to Home Screen"
3. Launch the app like a native application

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design principles

## 🐛 Bug Reports

Found a bug? Please open an issue on [GitHub Issues](https://github.com/BigTime5/Mzuri-Wealth-Tracker/issues) with:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots (if applicable)
- Device and browser information

## 📋 Roadmap

- [ ] Multi-currency support
- [ ] Expense receipt uploads
- [ ] Recurring transaction automation
- [ ] Financial goal setting and tracking
- [ ] Bill payment reminders
- [ ] Integration with M-Pesa API
- [ ] AI-powered spending insights
- [ ] Collaborative family budgets
- [ ] Export to Excel/PDF
- [ ] Dark mode support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**George Phinidy**

- Email: phinidygeorge01@gmail.com
- GitHub: [@BigTime5](https://github.com/BigTime5)
- Project Link: [https://github.com/BigTime5/Mzuri-Wealth-Tracker](https://github.com/BigTime5/Mzuri-Wealth-Tracker)

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Supabase](https://supabase.com/) team for the excellent backend platform
- The open-source community for inspiration and tools
- Everyone who contributes to making financial literacy accessible in Kenya

## 💬 Support

If you find this project helpful, please give it a ⭐️ on [GitHub](https://github.com/BigTime5/Mzuri-Wealth-Tracker)!

For questions or support, reach out via:
- Email: phinidygeorge01@gmail.com
- GitHub Issues: [Create an issue](https://github.com/BigTime5/Mzuri-Wealth-Tracker/issues)

---

<div align="center">

**Made with ❤️ for Kenya**

*Taking control of your finances, one shilling at a time.*

</div>
