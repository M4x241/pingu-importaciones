import React from 'react';

const AdminPage: React.FC = () => {
	return (
		<div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
			<h1>Panel de Administración</h1>
			<p>Contenido básico para mostrar la página.</p>

			<div
				style={{
					marginTop: '16px',
					padding: '16px',
					border: '1px solid #ccc',
					borderRadius: '8px',
					maxWidth: '400px',
				}}
			>
				<h2>Resumen</h2>
				<ul>
					<li>Usuarios: 0</li>
					<li>Pedidos: 0</li>
					<li>Productos: 0</li>
				</ul>
			</div>
		</div>
	);
};

export default AdminPage;
