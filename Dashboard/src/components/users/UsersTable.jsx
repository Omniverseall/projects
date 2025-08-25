import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
	{ id: 1, name: "Адольф Гитлер", email: "adolf_hitler@email.com", role: "Покупатель", status: "Активный", avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Hitler_portrait_crop.jpg" },
	{ id: 2, name: "Иосиф Сталин", email: "joseph_stalin@email.com", role: "Администратор", status: "Активный", avatar: "https://hcenter-irk.info/sites/default/files/1400885335_stalin-iosif-vissarionovich-1.jpg" },
	{ id: 3, name: "Дональд Трамп", email: "donald_trump@email.com", role: "Покупатель", status: "Неактивный", avatar: "https://upload.wikimedia.org/wikipedia/ru/thumb/0/0e/%D0%92%D1%8B%D1%81%D1%82%D1%80%D0%B5%D0%BB%D1%8B_%D0%B2_%D0%94%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%B4%D0%B0_%D0%A2%D1%80%D0%B0%D0%BC%D0%BF%D0%B0.webp/500px-%D0%92%D1%8B%D1%81%D1%82%D1%80%D0%B5%D0%BB%D1%8B_%D0%B2_%D0%94%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%B4%D0%B0_%D0%A2%D1%80%D0%B0%D0%BC%D0%BF%D0%B0.webp.png" },
	{ id: 4, name: "Махатир Мохамад", email: "mahathir_bin_Mohamad@email.com", role: "Покупатель", status: "Активный", avatar: "https://sharma.com.my/media/k2/items/cache/1c0ae2205709722b62e843abc0471a55_L.jpg" },
	{ id: 5, name: "Си Цзиньпин", email: "xi_jinping@email.com", role: "Модератор", status: "Активный", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Xi_Jinping_%28November_2024%29_02.jpg/440px-Xi_Jinping_%28November_2024%29_02.jpg" },
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Пользователи</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Поиск пользователей...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Имя
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Роль
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Статус
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Действия
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											{user.avatar ? (
												<img
													src={user.avatar}
													alt={user.name}
													className='h-10 w-10 rounded-full object-cover'
												/>
											) : (
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
													{user.name.charAt(0)}
												</div>
											)}
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.role}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.status === "Активный"
												? "bg-green-800 text-green-100"
												: "bg-red-800 text-red-100"
										}`}
									>
										{user.status}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Изменить</button>
									<button className='text-red-400 hover:text-red-300'>Удалить</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default UsersTable;
