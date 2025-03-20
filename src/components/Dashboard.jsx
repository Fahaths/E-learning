import React from 'react';
import './App.css'; // Import the CSS file
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Bookmark, 
  Star,
  ClipboardList,
  ShoppingCart,
  HelpCircle,
  Settings,
  LogOut,
  Book,
  Trophy
} from 'lucide-react';

// Sidebar Component
const Sidebar = ({ user, menuItems, bottomMenuItems }) => (
  <aside className="sidebar">
    <div className="user-profile">
      <div className="user-initials">{user.name[0]}</div>
      <div className="user-details">
        <span className="greeting">Hello,</span>
        <span className="user-name">{user.name}</span>
      </div>
    </div>

    <nav className="menu">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href="#"
          className={`menu-item ${item.active ? 'active' : ''}`}
        >
          <item.icon className="menu-icon" size={20} />
          <span className="menu-label">{item.label}</span>
        </a>
      ))}
    </nav>

    <div className="bottom-menu">
      {bottomMenuItems.map((item, index) => (
        <a
          key={index}
          href="#"
          className="bottom-menu-item"
        >
          <item.icon className="menu-icon" size={20} />
          <span className="menu-label">{item.label}</span>
        </a>
      ))}
    </div>
  </aside>
);

// Header Component
const Header = ({ user }) => (
  <header className="header">
    <div className="header-content">
      <h1 className="header-title">Dashboard</h1>
      <div className="header-date">
        <span>Your Application is pending as of {user.date}</span>
      </div>
    </div>

    <div className="profile-notice">
      <div className="notice-content">
        <User size={20} className="notice-icon" />
        <span className="notice-text">Set Your Profile Photo</span>
      </div>
      <button className="notice-button">Click Here</button>
    </div>
  </header>
);

// Stats Grid Component
const StatsGrid = ({ stats }) => (
  <div className="stats-grid">
    {stats.map((stat, index) => (
      <div key={index} className="stat-card">
        <div className="stat-icon">
          <stat.icon size={24} />
        </div>
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
      </div>
    ))}
  </div>
);

// In Progress Course Component
const InProgressCourse = ({ course }) => (
  <div className="course-card">
    <div className="course-image">
      <img src={course.image} alt={course.name} />
    </div>
    <div className="course-details">
      <div className="course-header">
        <h3 className="course-name">{course.name}</h3>
        <div className="course-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < course.rating ? 'filled' : 'empty'}
            />
          ))}
          <span className="rating-text">(0.00)</span>
        </div>
      </div>
      <div className="course-progress">
        <div className="progress-text">
          Completed Lessons: {course.lessonsCompleted}/{course.totalLessons} lessons
        </div>
        <div className="progress-percent">{course.progress}% Complete</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
      </div>
    </div>
  </div>
);

// Courses Table Component
const CoursesTable = ({ courses }) => (
  <div className="courses-table">
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Enrolled</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>{course.name}</td>
            <td>{course.enrolled}</td>
            <td>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < course.rating ? 'filled' : 'empty'}
                  />
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main App Component
function App() {
  const user = {
    name: "S Fanath",
    date: "07 February, 2025"
  };

  const stats = [
    { icon: Book, label: "Enrolled Courses", value: "2" },
    { icon: GraduationCap, label: "Active Courses", value: "1" },
    { icon: Trophy, label: "Completed Courses", value: "1" }
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: User, label: "My Profile" },
    { icon: GraduationCap, label: "Enrolled Courses" },
    { icon: Bookmark, label: "Wishlist" },
    { icon: Star, label: "Reviews" },
    { icon: ClipboardList, label: "My Quiz Attempts" },
    { icon: ShoppingCart, label: "Order History" },
    { icon: HelpCircle, label: "Question & Answer" }
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout" }
  ];

  const courses = [
    { name: "check", enrolled: 0, rating: 5 },
    { name: "python", enrolled: 1, rating: 0 }
  ];

  const inProgressCourse = {
    name: "python",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 2,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=400&h=200"
  };

  return (
    <div className="app">
      <Sidebar user={user} menuItems={menuItems} bottomMenuItems={bottomMenuItems} />
      <main className="main-content">
        <Header user={user} />
        <StatsGrid stats={stats} />
        <section className="in-progress-section">
          <h2>In Progress Courses</h2>
          <InProgressCourse course={inProgressCourse} />
        </section>
        <section className="courses-section">
          <div className="courses-header">
            <h2>My Courses</h2>
            <button>View All</button>
          </div>
          <CoursesTable courses={courses} />
        </section>
      </main>
    </div>
  );
}

export default App;