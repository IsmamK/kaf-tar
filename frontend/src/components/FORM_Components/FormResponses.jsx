import React from 'react';
import moment from 'moment';

const FormResponses = ({ responses }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">Form Field</th>
            <th className="px-6 py-3">Value</th>
            <th className="px-6 py-3">Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {responses
            .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
            .map((response) => (
              <tr key={response.id} className="border-b">
                <td className="px-6 py-4">{response.form_field.name}</td>
                <td className="px-6 py-4">
                  {response.form_field.field_type === 'image' ? (
                    <img
                      src={response.value}
                      alt="Image preview"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    response.value
                  )}
                </td>
                <td className="px-6 py-4">
                  {moment(response.submitted_at).format('MMMM D, YYYY, h:mm A')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormResponses;
