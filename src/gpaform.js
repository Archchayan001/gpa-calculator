import { useState } from "react";
import { motion } from "framer-motion";

const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];

export default function GPAForm() {
  const [entries, setEntries] = useState([{ grade: "", credit: "" }]);
  const [gpa, setGpa] = useState(null);

  const addRow = () => {
    setEntries([...entries, { grade: "", credit: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const calculateGPA = () => {
    const gradePoints = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D+": 1.3, "D": 1.0, "F": 0.0
    };

    let totalPoints = 0, totalCredits = 0;
    entries.forEach(({ grade, credit }) => {
      if (grade && credit) {
        totalPoints += gradePoints[grade] * parseFloat(credit);
        totalCredits += parseFloat(credit);
      }
    });

    setGpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500  to-green-500 text-white p-6 relative overflow-hidden">
        
      

      <motion.h1 
        className="text-4xl font-bold mb-6 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        GPA Calculator
      </motion.h1>

      <motion.div 
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <motion.div 
              key={index}
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <select
                className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded"
                value={entry.grade}
                onChange={(e) => handleChange(index, "grade", e.target.value)}
              >
                <option value="">Select Grade</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <input
                type="number"
                className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded"
                placeholder="Credits"
                value={entry.credit}
                onChange={(e) => handleChange(index, "credit", e.target.value)}
              />
            </motion.div>
          ))}
        </div>

        <motion.button 
          className="mt-4 w-full bg-green-500 p-2 rounded-lg font-semibold hover:bg-green-600 transition"
          onClick={addRow}
          whileHover={{ scale: 1.05 }}
        >
          + Add Subject
        </motion.button>

        <motion.button 
          className="mt-4 w-full bg-blue-500 p-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          onClick={calculateGPA}
          whileHover={{ scale: 1.05 }}
        >
          Calculate GPA
        </motion.button>

        {gpa !== null && (
          <motion.div 
            className="mt-6 text-center text-2xl font-bold bg-gray-700 p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your GPA: {gpa}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
